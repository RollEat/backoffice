<template>
	<v-container justify="center">
		<v-col class="col-8 offset-2" justify="center" align="center">
			<h2>Inscription</h2>
			<v-stepper v-model="step">
				<v-stepper-header>
					<v-stepper-step :complete="step > 1" step="1">
						Profil
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="step > 2" step="2">
						Contact
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="step > 3" step="3">
						Établissement
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step step="4">
						Confirmation
					</v-stepper-step>
				</v-stepper-header>

				<v-stepper-items>
					<v-stepper-content step="1">
						<v-form>
							<v-row>
								<v-col cols="12" sm="6">
									<v-row>
										<v-col cols="6">
											<v-text-field v-model="profile.firstName" label="Prénom"></v-text-field>
										</v-col>
										<v-col cols="6">
											<v-text-field v-model="profile.lastName" label="Nom"></v-text-field>
										</v-col>
									</v-row>
									<v-text-field v-model="profile.email" label="Email"></v-text-field>
								</v-col>

								<v-col cols="12" sm="6">
									<v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :success="passConf.success" label="Mot de passe" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"></v-text-field>
									<v-text-field v-model="password2" :error-messages="passConf.msg" :error="passConf.error" :success="passConf.success" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="Confirmation du mot de passe" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"></v-text-field>
								</v-col>
							</v-row>
						</v-form>
					</v-stepper-content>

					<v-stepper-content step="2">
						<!--
							lastName: "",
							firstName: "",
							username: "",

							avatar: "",

							address: {
								street: "",
								city: "",
								postalCode: "",
							},

							phone: "",
							email: "",
							birthdate: "",
							creationDate: "",
						-->

						<v-form>
							<v-row>
								<v-col cols="12" sm="6">
									<h3 class="headline">Adresse principale</h3>
									<v-text-field v-model="profile.address.street" label="Rue"></v-text-field>
									<v-row>
										<v-col cols="4">
											<v-text-field v-model="profile.address.city" label="Ville"></v-text-field>
										</v-col>
										<v-col cols="4">
											<v-text-field v-model="profile.address.postalCode" type="number" label="Code Postal"></v-text-field>
										</v-col>
										<v-col cols="4">
											<v-select v-model="profile.address.country" :hint="`${select.state}, ${select.abbr}`" :items="items" item-text="state" item-value="abbr" label="Select" persistent-hint return-object single-line></v-select>
										</v-col>
									</v-row>
								</v-col>

								<v-col cols="12" sm="6">
									<h3 class="headline">Adresse de facturation</h3>
									<v-text-field v-model="profile.address2.street" label="Rue"></v-text-field>
									<v-row>
										<v-col cols="4">
											<v-text-field v-model="profile.address2.city" label="Ville"></v-text-field>
										</v-col>
										<v-col cols="4">
											<v-text-field v-model="profile.address2.postalCode" type="number" label="Code Postal"></v-text-field>
										</v-col>
										<v-col cols="4">
											<v-select v-model="profile.address2.country" :hint="`${select.state}, ${select.abbr}`" :items="items" item-text="state" item-value="abbr" label="Select" persistent-hint return-object single-line></v-select>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</v-form>
					</v-stepper-content>

					<v-stepper-content step="3">
						
					</v-stepper-content>


					<v-row class="mb-2" align="center" justify="center">
						<v-col cols="7">
							<v-btn color="primary" @click="step++" v-if="step < 4">
								Suivant
							</v-btn>

							<v-btn text @click="step--" v-if="step > 1">
								Précédent
							</v-btn>
						</v-col>
						<v-col cols="5">
							<v-btn text align="right">
								J'ai déjà un compte
							</v-btn>
						</v-col>
					</v-row>
				</v-stepper-items>
			</v-stepper>
		</v-col>
	</v-container>
</template>

<script>
export default {
	name: "Signup",

	data() {
		return {
			showPassword: false,

			password: '',
			password2: '',

			profile: this.$models.user,
			restaurant: {

			},

			step: 1,

			passConf: {
				msg: '',
				error: false,
				success: false
			},

			select: {},
			items: [
				{ state: 'France', abbr: 'FR' },
				{ state: 'États-Unis', abbr: 'USA' },
				{ state: 'Royaume-Uni', abbr: 'UK' },
			],
		};
	},
	watch: {
		password2: function() {
			this.checkPassword();
		},
		password: function() {
			this.checkPassword();
		}
	},
	methods: {
		checkPassword() {
			if(this.password2){
				this.passConf = {
					msg: 'Les mots de passent ne correspondent pas.',
					error: true,
					success: false
				}
			}

			if(this.password == this.password2) this.passConf = {
				msg: '',
				error: false,
				success: true
			}
		},
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
	},
	created() {
		this.profile.address2.country = this.items[0];
		this.profile.address.country = this.items[0];
	}
};
</script>

<style></style>
