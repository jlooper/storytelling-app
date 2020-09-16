import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import buefy from 'buefy';
import Mindmap from 'vue-mindmap';
import 'vue-mindmap/dist/vue-mindmap.css';

Vue.use(Mindmap);
Vue.use(buefy);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
