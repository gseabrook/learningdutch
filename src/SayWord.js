export default class SayWord {
	constructor(word){
		this.word = word;
	}

	say(){
		var ssu = new SpeechSynthesisUtterance();
		ssu.text = this.word;
		speechSynthesis.speak(ssu);
		console.log(word);
		console.log("Dispatching listening true");
		window.setTimeout(() => {
			this.meter.listening = true;
			console.log("Listening: true");
		}, 1500);
	}
}