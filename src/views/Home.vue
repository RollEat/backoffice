<template>
	<div class="home">
		<div  id="id-title">
			<v-container>
				<h1>
					Découvrez vos limites !
				</h1>
				<router-link to="/order" class="buttons">
					<v-btn>Commander</v-btn>
				</router-link>
			</v-container>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home"
};
</script>

<style scoped>
h1 {
	font-size: 50px;
	color: white;
}

.description {
	width: 50%;
}
.home {
	background-image: url("../assets/background.jpg");
	background-position: center;
	background-size: cover;
	height: 100%;
	width: 100%;
}
#id-title{
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
