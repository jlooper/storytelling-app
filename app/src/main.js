import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import buefy from 'buefy';
var VueScrollTo = require('vue-scrollto');

Vue.use(buefy);
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
