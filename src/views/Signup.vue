<template>
	<v-container justify="center">
		<v-col class="col-8 offset-2" justify="center" align="center">
			<h2>Inscription</h2>
			<v-text-field
				label="Pseudo"
				type="text"
				v-model="pseudo"
			></v-text-field>
			<v-text-field
				label="Email"
				type="email"
				v-model="email"
			></v-text-field>
			<v-row class="align-content-center py-2">
				<v-col cols="12" lg="6" class="py-0">
					<v-text-field
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						label="Mot de passe"
						:type="showPassword ? 'text' : 'password'"
						@click:append="showPassword = !showPassword"
					>
					</v-text-field>
				</v-col>
				<v-col cols="12" lg="6" class="py-0">
					<v-text-field
						v-model="password2"
						:append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
						label="Confirmation de mot de passe"
						:type="showPassword2 ? 'text' : 'password'"
						@click:append="showPassword2 = !showPassword2"
					>
					</v-text-field>
				</v-col>
			</v-row>
			<v-container class="py-8">
				<v-btn @click="submit()">Inscription</v-btn>
			</v-container>
			<p>
				<router-link to="/login"> J'ai un compte </router-link>
			</p>
		</v-col>
	</v-container>
</template>

<script>
export default {
	name: "Signup",

	data() {
		return {
			password: "",
			password2: "",
			pseudo: "",
			email: "",
			showPassword: false,
			showPassword2: false
		};
	},

	methods: {
		verifyPassword: function() {
			if (this.password == this.password2) {
				return true;
			}
			return false;
		},

		submit() {
			console.log("Mon compte?");
			if (this.verifyPassword()) {
				this.$firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.then(credentials => {
						credentials.user.updateProfile({
							displayName: this.pseudo
						});

						this.$db
							.collection("users")
							.doc(credentials.user.uid)
							.set({
								username: this.pseudo,
								email: this.email,
								creationDate: new Date()
							});
					});
			}
		}
	}
};
</script>

<style></style>
