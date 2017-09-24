import AudioMeter from './AudioMeter'
import SayWord from './SayWord'

export default class ListenForWords {
	
	constructor(words){
		this.words = words;
		this.subset = [];
		this.meter = null;
	}

  	loadWords(x) {
		if (x > this.words.length) {
		  sayWord("Congratulations you have finished!");
		} else {
		  console.log(x + " out of " + this.words.length);
		}
		this.subset = this.subset.concat(this.words.slice(0, x));
		this.shuffle(this.subset);
  	}

  	shuffle(arr) {
  		arr.sort(() => (Math.random() - 0.5));
  	}

	startListening() {
	  	this.shuffle(this.words);
	  	var self = this;
		document.onkeypress = function (e) {
			if (self.subset.length === 0) {
			  	new SayWord("Adding words").say();
			  	self.loadWords(this.x += 5);
			} else {
				new SayWord(self.subset.pop()).say();
			}
	  	};

	  	window.addEventListener('heard-sound', function() {
			if (self.subset.length === 0) {
			  	new SayWord("Adding words").say();
			  	self.loadWords(self.x += 5);
			} else {
				meter.listening = false;
	    		console.log("Listening: false");
		    	new SayWord(self.subset.pop()).say();
		    	window.setTimeout(() => {
		    		self.meter.listening = true;
		    		console.log("Listening: true");
		    	}, 1500);
			}
	  	});

		var audioContext = null;
		var meter = null;
		var canvasContext = null;
		var WIDTH = 500;
		var HEIGHT = 50;
		var rafID = null;

	  	canvasContext = document.getElementById( "canvasmeter" ).getContext("2d");
			
	    // monkeypatch Web Audio
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
		
	    // grab an audio context
	    audioContext = new AudioContext();

	    try {
	        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	        navigator.getUserMedia(
	        {
	            "audio": {
	                "mandatory": {
	                    "googEchoCancellation": "false",
	                    "googAutoGainControl": "false",
	                    "googNoiseSuppression": "false",
	                    "googHighpassFilter": "false"
	                },
	                "optional": []
	            },
	        }, gotStream, didntGetStream);
	    } catch (e) {
	        alert('getUserMedia threw exception :' + e);
	    }

		function didntGetStream() {
		    alert('Stream generation failed.');
		}

		var mediaStreamSource = null;

		function gotStream(stream) {
		    // Create an AudioNode from the stream.
		    mediaStreamSource = audioContext.createMediaStreamSource(stream);

		    // Create a new volume meter and connect it.
		    var meter = AudioMeter.createAudioMeter(audioContext);
		    self.meter = meter;
		    self.listening = meter.listening;
		    mediaStreamSource.connect(meter);

		    // kick off the visual updating
		    drawLoop();
		}

		function drawLoop( time ) {
		    // clear the background
		    canvasContext.clearRect(0,0,WIDTH,HEIGHT);

		    // check if we're currently clipping
		    if (self.meter.checkClipping())
		        canvasContext.fillStyle = "red";
		    else
		        canvasContext.fillStyle = "green";

		    // draw a bar based on the current volume
		    canvasContext.fillRect(0, 0, self.meter.volume*WIDTH*1.4, HEIGHT);

		    // set up the next visual callback
		    rafID = window.requestAnimationFrame( drawLoop );
		}
	}
}