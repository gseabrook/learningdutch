export default class AudioMeter {
	
	static createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
		var processor = audioContext.createScriptProcessor(512);
		processor.onaudioprocess = this.volumeAudioProcess;
		processor.clipping = false;
		processor.lastClip = 0;
		processor.volume = 0;
		processor.clipLevel = clipLevel || 0.98;
		processor.averaging = averaging || 0.95;
		processor.clipLag = clipLag || 750;
		processor.listening = false;

		// this will have no effect, since we don't copy the input to the output,
		// but works around a current Chrome bug.
		processor.connect(audioContext.destination);

		processor.checkClipping =
			function(){
				if (!this.clipping)
					return false;
				if ((this.lastClip + this.clipLag) < window.performance.now())
					this.clipping = false;
				return this.clipping;
			};

		processor.shutdown =
			function(){
				this.disconnect();
				this.onaudioprocess = null;
			};

		return processor;
	}

	static volumeAudioProcess( event ) {
		var buf = event.inputBuffer.getChannelData(0);
	    var bufLength = buf.length;
		var sum = 0;
	    var x;

		// Do a root-mean-square on the samples: sum up the squares...
	    for (var i=0; i<bufLength; i++) {
	    	x = buf[i];
	    	if (Math.abs(x)>=this.clipLevel) {
	    		this.clipping = true;
	    		this.lastClip = window.performance.now();
	    	}
	    	sum += x * x;
	    }

	    // ... then take the square root of the sum.
	    var rms =  Math.sqrt(sum / bufLength);

	    // Now smooth this out with the averaging factor applied
	    // to the previous sample - take the max here because we
	    // want "fast attack, slow release."
	    this.volume = Math.max(rms, this.volume*this.averaging);

	    if (this.listening && this.volume > 0.2) {
			this.listening = false;
	    	console.log("Over threshold");
			var evt = new Event("heard-sound", {"bubbles":true, "cancelable":false});
			console.log("Over threshold - dispatching event in 1500 milis, listening: false");
			window.setTimeout(() => {
				console.log("Dispatched heard sound event");
				window.dispatchEvent(evt);
			}, 1500);
	    }
	}
}