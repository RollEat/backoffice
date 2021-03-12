import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import firebase from "firebase/app";
import db from "@/components/firebaseInit";
import "firebase/auth";
Vue.prototype.$db = db;
Vue.prototype.$firebase = firebase;

import { models } from "./components/toLoad/models";
Vue.prototype.$models = models;

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
});
