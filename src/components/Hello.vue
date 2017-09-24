<template>
	<div>
		<b-navbar toggleable="md" type="dark" variant="info">
			  <b-navbar-brand href="#">Home</b-navbar-brand>
		</b-navbar>	
		<h1 v-bind:class="{ active: listening }">Graham is Learning Dutch</h1>
		<h2>{{currentWord}}</h2>
		<canvas id="canvasmeter" width="500" height="50"></canvas>
	</div>
</template>

<script>
import AudioMeter from '../AudioMeter'

export default {
  name: 'hello',
  data () {
	return {
		// allWords:["Welkom to", "Good Morning", "Everyone", "Course", "The", "Dutch", "i", "I Am", "And", "Your plural", "Teacher", "Teachers", "To Have", "Other", "He", "days", "begin", "with", "get to know", "who", "are", "what", "Your singular", "name", "my", "day", , "first name", "surname", "from", "Which", "Country", "England", "To Come", "Neighbour", "Of", "How", "Whats your name", "Is Called", "Where ... from", "Where", "China", "To Live", "Now", "Address", "Number", "Answer (noun)", "No", "Postal Code", "You Formal", "Mrs", "Also", "In", "To Teach", "To say", "But", "Yes", "Here", "Already", "Twnety", "Year", "Go on", "Lesson", "Everyone", "Book", "The", "Text", "On", "Page", "To Listen", "To", "Read", "Stop", "For a moment", "It is", "Break", "See you later", "Soon"],
		allWords:["To sit", "canteen", "this", "seat", "place", "free", "yes", "okay", "right", "a", "an", "nice", "delicious", "cup",
		"coffee", "for a long time", "only", "or", "what", "actually", "today", "Thursday", "August", "tomorrow", /* "it's my birthday",
		"how nice", "December", "so", "therefore", "winter", "get", "receive", "any", "visit", "brother", "younger", "but", "certainly", 
		"taller", "any more", "brothers", "sister", "sisters", "as well", "look", "photo", "oh", "very", "different", "other", "type", "short", "blonde", "hair", "dark", "parents", "pay a viist", "at the moment", "Indoneisia", "to do", "there", "on holiday", "holiday", "father", "for", "his", "work", "season", "when", "summer", "know", "not", "to tell", "about", "familty", "that", "to want", "late", "11 o'clock", "have to", "again", "to"*/
		],
		currentWord: "",
		x: 0,
		subset: [],
		listening: false
	}
  },
  mounted: function() {
  	var self = this;
  	self.shuffle(self.allWords);
	document.onkeypress = function (e) {
		if (self.subset.length === 0) {
		  	self.sayWord("Adding words");
		  	self.loadWords(self.x += 10);
		} else {
			self.sayWord(self.subset.pop());
		}
  	};

  	window.addEventListener('heard-sound', function() {
		if (self.subset.length === 0) {
		  	self.sayWord("Adding words");
		  	self.loadWords(self.x += 5);
		} else {
			meter.listening = false;
    		console.log("Listening: false");
	    	self.sayWord(self.subset.pop());
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
	    meter = AudioMeter.createAudioMeter(audioContext);
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
	    if (meter.checkClipping())
	        canvasContext.fillStyle = "red";
	    else
	        canvasContext.fillStyle = "green";

	    // draw a bar based on the current volume
	    canvasContext.fillRect(0, 0, meter.volume*WIDTH*1.4, HEIGHT);

	    // set up the next visual callback
	    rafID = window.requestAnimationFrame( drawLoop );
	}
  },
  destroyed: function() {
  	document.onkeypress = function(){};
  },
  methods: {
  	loadWords: function(x) {
		if (x > this.allWords.length) {
		  this.sayWord("Congratulations you have finished!");
		} else {
		  console.log(x + " out of " + this.allWords.length);
		}
		this.subset = this.subset.concat(this.allWords.slice(0, x));
		this.shuffle(this.subset);
  	},
  	sayWord: function(word) {
		var ssu = new SpeechSynthesisUtterance();
		ssu.text = word;
		speechSynthesis.speak(ssu);
		this.currentWord = word;
		console.log(word);
		console.log("Dispatching listening true");
		window.setTimeout(() => {
			this.meter.listening = true;
			console.log("Listening: true");
		}, 1500);
	},
  	shuffle: function(arr) {
  		arr.sort(() => (Math.random() - 0.5));
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1.listening {
		background-color: red;
	}
</style>
