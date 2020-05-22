import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FirebaseApp from "./plugins/firebaseApp";
import vuetify from './plugins/vuetify';

FirebaseApp.init();

import "firebaseui-ja/dist/firebaseui.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
