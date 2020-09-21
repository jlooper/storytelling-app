import Vue from 'vue';
import Router from 'vue-router';

import About from '@/views/About.vue';
import Stories from '@/views/Stories.vue';
import Story from '@/views/Story.vue';
import Home from '@/views/admin/Home.vue';
import Search from '@/views/admin/Search.vue';
import MyStories from '@/views/admin/MyStories.vue';
import MyStory from '@/views/admin/MyStory.vue';
import StoryCustomizer from '@/views/admin/StoryCustomizer.vue';
import Create from '@/views/admin/Create.vue';

import Lost from '@/components/Lost.vue';

import store from './store.js';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'stories',
			component: Stories,
		},
		{
			path: '/story',
			name: 'story:id',
			component: Story,
		},
		{
			path: '/admin',
			name: 'home',
			component: Home,
		},
		{
			path: '/admin/home',
			name: 'my-stories',
			component: MyStories,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/admin/story/:id',
			name: 'my-story',
			component: MyStory,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/admin/create',
			name: 'create',
			component: Create,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/admin/search/:id',
			name: 'search',
			component: Search,
			meta: {
				requiresAuth: true,
			},
		},

		{
			path: '/story/:id',
			name: 'story',
			component: Story,
		},

		{
			path: '/about',
			name: 'about',
			component: About,
		},

		{
			path: '/admin/storycustomizer/:id',
			name: 'storycustomizer',
			component: StoryCustomizer,
		},

		{
			path: '/error',
			name: 'error',
			component: Lost,
		},
	],
});
router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next();
			return;
		}
		next('/');
	} else {
		next();
	}
});
export default router;
