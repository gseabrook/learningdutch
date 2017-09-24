<template>
	<div>
		<div class="header">
			<b-navbar toggleable="md" type="dark" variant="info">
				  <b-navbar-brand href="#">Home</b-navbar-brand>
			</b-navbar>	
			<h1>Graham is Learning Dutch</h1>
		</div>
		<b-container class="menu-grid">
		    <b-row>
		        <b-col class="welcome alert alert-info welcome" v-on:click="navigateTo('welcome')"></b-col>
		        <b-col class="numbers alert alert-info numbers" v-on:click="navigateTo('numbers')"></b-col>
		        <b-col class="canteen alert alert-info canteen" v-on:click="navigateTo('canteen')"></b-col>
		    </b-row>
		</b-container>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {};
	},
	methods: {
		navigateTo: function(component) {
			this.$router.push( {name: component});
		}
	}
}

</script>

<style>
.menu-grid div.col {
	height: 240px;
	width: 240px;
	line-height: 200px;
	margin: 5px;
    background-repeat: no-repeat;
    background-size: cover;
}

div.welcome {
    background-image: url('/static/welcome.jpeg');
}

div.numbers {
    background-image: url('/static/numbers.jpeg');
}

div.canteen {
    background-image: url('/static/dinner.jpeg');
}

.menu-grid .row {
  min-height: 10rem;
}

div.header h1 {
	margin: 10px 0px 10px 0px;
}
</style>