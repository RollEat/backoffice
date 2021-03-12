<template>
	<v-app class="app">
		<Header />
		<v-main>
			<v-divider></v-divider>
			<router-view></router-view>
		</v-main>
		<v-divider></v-divider>
		<Footer />
	</v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
	name: "App",

	components: {
		Header,
		Footer
	},
	data: () => ({
		//
	})
};
</script>

<style>
.buttons {
	text-decoration: none;
}

.app {
	font-family: Poppins, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

@font-face {
	font-family: 'poppinsregular';
	src: url('assets/fonts/poppins-regular-webfont.woff2') format('woff2'),
	url('assets/fonts/poppins-regular-webfont.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}
</style>
