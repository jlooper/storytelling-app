import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import buefy from 'buefy';

Vue.use(buefy);

import DummyRed		from '@/components/dummy/DummyRed.vue'
import DummyGreen	from '@/components/dummy/DummyGreen.vue'
import DummyBlue	from '@/components/dummy/DummyBlue.vue'

Vue.component(DummyRed.name, DummyRed)
Vue.component(DummyGreen.name, DummyGreen)
Vue.component(DummyBlue.name, DummyBlue)


Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app');
