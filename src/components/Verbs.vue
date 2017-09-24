<template>
	<div>
		<h1>Verbs</h1>
	</div>
</template>

<script>
export default {
  name: 'verbs',
  data () {
	return {
		pronouns:["I", "You (Singular)", "You (Formal)", "He", "She", "We", "You (Plural)", "They"],
		verbs: ["To Have", "To Be"]
		currentWord: "",
		subset: []
	}
  },
  mounted: function() {
  	var self = this;
	document.onkeypress = function (e) {
		
	};
  },
  destroyed: function() {
  	document.onkeypress = function(){};
  },
  methods: {
  	loadWords: function(x) {
		if (x > this.allWords.length) {
		  sayWord("Congratulations you have finished!");
		} else {
		  console.log(x + " out of " + this.allWords.length);
		}
		subset = [];
		subset = subset.concat(this.allWords.slice(0, x)).concat(this.allWords.slice(0, x));
		this.shuffle(subset);
  	},
  	sayWord: function(word) {
		var ssu = new SpeechSynthesisUtterance();
		ssu.text = word;
		speechSynthesis.speak(ssu);
		this.currentWord = word;
		console.log(word);
	},
  	shuffle: function(arr) {
  		arr.sort(() => (Math.random() - 0.5));
  	}
  }
}
</script>