<template>
	<nav>
		<v-app-bar app elevation="0">
			<v-toolbar-title>
				<a color="primary" class="text-decoration-none" href="/">RollEat</a>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<div v-if="loggedIn">
				<v-list-item-avatar @click="userDrawer = !userDrawer" app>
					<img v-if="loggedIn && user.photoURL" :src="user.photoURL">
					<img v-else src="https://images.vexels.com/media/users/3/185786/isolated/lists/bd8af8ec178972df7825765559d62d2c-kawaii-hot-choco.png">
				</v-list-item-avatar>
			</div>
			<div v-else>
				<router-link to="/login" class="buttons">
					<v-btn small color="primary">Se connecter</v-btn>
				</router-link>
			</div>
		</v-app-bar>

		<v-navigation-drawer v-model="userDrawer" color="info" right temporary absolute dark>
			<v-list class="py-0">
				<v-list-item two-line :class="miniVariant && 'px-0'" v-if="loggedIn">
					<v-list-item-avatar>
						<img v-if="user.photoURL" :src="user.photoURL">
						<img v-else src="https://images.vexels.com/media/users/3/185786/isolated/lists/bd8af8ec178972df7825765559d62d2c-kawaii-hot-choco.png">
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>Bonjour {{ userData.firstName }} !</v-list-item-title>
						<v-list-item-subtitle v-if="userData.company">{{ compData.name }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>

				<v-divider></v-divider>

				<v-list-item v-for="item in items" :key="item.title" link router :to="item.route">

					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>

				</v-list-item>

				<v-list-item link @click="logoutDialog = true">
					<v-list-item-icon>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Déconnexion</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-row class="justify-center">
					<v-switch class="mt-5" v-model="$vuetify.theme.dark" @click="darkMode = !darkMode"></v-switch>
					<v-icon class="mr-5" v-if="darkMode == false" color="yellow">
						mdi-white-balance-sunny
					</v-icon>
					<v-icon class="mr-5" v-if="darkMode == true" color="grey">
						mdi-weather-night
					</v-icon>
				</v-row>
			</v-list>
		</v-navigation-drawer>

		<v-dialog v-model="logoutDialog" max-width="525">
			<v-card>
				<v-card-title class="headline">
					Voulez-vous vraiment vous déconnecter ?
				</v-card-title>
				<v-card-text>
					<img width="480" src="https://i.imgur.com/OI30Xvb.jpg" alt="Logout cat" />
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green darken-1" text @click="logoutDialog = false">
						NON !
					</v-btn>
					<v-btn color="red darken-1" text @click="signOut(), (logoutDialog = false)">
						ui
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</nav>
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {
				user: {},
				userData: this.$models.user,

				logoutDialog: false,

				loggedIn: false,

				userDrawer: false,

				darkMode: false,
				
				items: [
					{
						title: 'Mon profil',
						icon: 'mdi-account',
						route: '/profile'
					},
					{
						title: 'Mes commandes',
						icon: 'mdi-food-variant',
						route: '/history'
					}
				]
			};
		},
		methods: {
			async signOut() {
				try {
					await this.$firebase.auth().signOut();
					this.$router.replace({
						path: "Login"
					});
				} catch (err) {
					console.log(err);
				}
				
			}
		},
		created() {
			this.user = this.$firebase.auth().currentUser;

			this.loggedIn = this.user.uid;

			this.$db.collection("users").doc(this.user.uid).onSnapshot(doc => {
				this.userData = {
					...this.$models.user,
					...doc.data(),
					id: doc.id
				};
			});
		}
	};

</script>
