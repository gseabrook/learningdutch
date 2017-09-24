<template>
	<div>
		<b-navbar toggleable="md" type="dark" variant="info">
			  <b-navbar-brand href="#">Home</b-navbar-brand>
		</b-navbar>	
		<h1 v-bind:class="{ active: listening }">Graham is Learning Canteen</h1>
		<h2>{{currentWord}}</h2>
		<canvas id="canvasmeter" width="500" height="50"></canvas>
	</div>
</template>

<script>
import AudioMeter from '../AudioMeter'
import ListenForWords from '../ListenForWords'

export default {
  name: 'Canteen',
  data () {
	return {
		allWords:["To sit", "canteen", "this", "seat", "place", "free", "yes", "okay", "right", "a", "an", "nice", "delicious", "cup",
		"coffee", "for a long time", "only", "or", "what", "actually", "today", "Thursday", "August", "tomorrow", "it's my birthday",
		"how nice", "December", "so", "therefore", "winter", "To Get", "To Receive", "any", "visit", "brother", "younger", "but", "certainly", "taller", "any more", "brothers", "sister", "sisters", "as well", "look", "photo", "oh", "very", "different", "other", "type", "short", "blonde", "hair", "dark", "parents", "pay a viist", "at the moment", "Indoneisia", "to do", "there", "on holiday", "holiday", "father", "for", "his", "work", "season", "when", "summer", "know", "not", "to tell", "about", "familty", "that", "to want", "late", "11 o'clock", "have to", "again", "to"],
		currentWord: "",
		x: 0,
		subset: [],
		listening: false
	}
  },
  mounted: function() {
  	var self = this;
  	new ListenForWords(this.allWords).startListening();
  },
  destroyed: function() {
  	document.onkeypress = function(){};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1.listening {
		background-color: red;
	}
</style>
