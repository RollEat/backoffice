<template>
	<div class="about">
		<v-row class="col-8 offset-2">
			<v-col cols="12">
				<h1 class="font-weight-light text-center">Mon profil</h1>
			</v-col>

			<v-col cols="12" lg="6">
				<v-text-field
					class="px-0"
					type="text"
					label="Prénom"
					v-model="userData.firstName"
				></v-text-field>
			</v-col>
			<v-col cols="12" lg="6">
				<v-text-field
					class="px-0"
					type="text"
					label="Nom"
					v-model="userData.lastName"
				></v-text-field>
			</v-col>

			<v-col cols="12" lg="6">
				<v-text-field
					class="px-0"
					type="text"
					label="Pseudo"
					v-model="userData.username"
				></v-text-field>
			</v-col>
			<v-col cols="12" lg="4">
				<v-text-field
					class="px-0"
					type="text"
					label="Email"
					v-model="userData.email"
				></v-text-field>
			</v-col>
			<v-col cols="12" lg="2">
				<v-text-field
					class="px-0"
					type="text"
					label="phone"
					v-model="userData.phone"
				></v-text-field>
			</v-col>

			<v-col cols="12" lg="6">
				<v-text-field
					class="px-0"
					type="text"
					label="Rue"
					v-model="userData.address.street"
				></v-text-field>
			</v-col>
			<v-col cols="12" lg="4">
				<v-text-field
					class="px-0"
					type="text"
					label="Ville"
					v-model="userData.address.city"
				></v-text-field>
			</v-col>
			<v-col cols="12" lg="2">
				<v-text-field
					class="px-0"
					type="text"
					label="Code postal"
					v-model="userData.address.zipcode"
				></v-text-field>
			</v-col>
			<v-col cols="12" lg="12" align="center">
				<v-btn color="success" @click="submit" outlined
					>Sauvegarder</v-btn
				>
			</v-col>
			<v-snackbar v-model="snackbar" timeout="3000">
				{{this.snackbarText}}

				<template v-slot:action="{ attrs }">
					<v-btn
						color="blue"
						text
						v-bind="attrs"
						@click="snackbar = false"
					>
						Fermer
					</v-btn>
				</template>
			</v-snackbar>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "About",
	data() {
		return {
			userData: this.$models.user,
			snackbar: false,
			snackbarText: ""
		};
	},
	methods: {
		submit() {
			this.$db
				.collection("users")
				.doc(this.$firebase.auth().currentUser.uid)
				.set(
					{
						...this.userData
					},
					{
						merge: true
					}
				)
				.then(() => {
					console.log("Document successfully written!");
					this.snackbarText = "Votre profil à été mis à jour";
					this.snackbar = true;
				})
				.catch((err) => {
					console.log(err);

					this.snackbarText = err;
					this.snackbar = true
				})
		}
	},
	created() {
		this.$db
			.collection("users")
			.doc(this.$firebase.auth().currentUser.uid)
			.onSnapshot(doc => {
				this.userData = {
					...this.$models.user,
					...doc.data(),
					id: doc.id
				};
			});
	}
};
</script>
