<template>
	<v-container justify="center">
		<v-col class="col-8 offset-2" justify="center" align="center">
			<h2>Connexion</h2>
			<v-text-field v-model="email" label="Email"> </v-text-field>
			<v-text-field
				v-model="password"
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				label="Mot de passe"
				:type="showPassword ? 'text' : 'password'"
				@click:append="showPassword = !showPassword"
			>
			</v-text-field>

			<v-btn @click="submit()">Connexion</v-btn>
			<p>
				<router-link to="/signup"> Créer un compte </router-link>
			</p>
		</v-col>
	</v-container>
</template>

<script>
export default {
	name: "Login",

	data() {
		return {
			showPassword: false,
			email: "",
			password: ""
		};
	},

	methods: {
		async submit() {
			try {
				await this.$firebase
					.auth()
					.signInWithEmailAndPassword(this.email, this.password);

				this.$router.replace({
					path: "/"
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>

<style scoped>
h2 {
	text-align: center;
}

.v-btn {
	margin: 25px;
}
</style>
