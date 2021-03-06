import Vue from 'vue';
import Router from 'vue-router';

import About from '@/views/About.vue';
import Stories from '@/views/Stories.vue';
import Story from '@/views/Story.vue';
import WebStory from '@/views/WebStory.vue';
import Home from '@/views/admin/Home.vue';
import MyStorySearch from '@/views/admin/MyStorySearch.vue';
import MyStories from '@/views/admin/MyStories.vue';
import MyStory from '@/views/admin/MyStory.vue';
import MyStoryMetadata from '@/views/admin/MyStoryMetadata.vue';
import MyStoryTiles from '@/views/admin/MyStoryTiles.vue';

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
			name: 'story',
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
			path: '/admin/story/metadata/:id',
			name: 'addmetadata',
			component: MyStoryMetadata,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/admin/story/layout/:id',
			name: 'storylayout',
			component: MyStoryTiles,
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
			path: '/admin/story/search/:id',
			name: 'search',
			component: MyStorySearch,
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
			path: '/story/preview/:id',
			name: 'webstory',
			component: WebStory,
		},

		{
			path: '/about',
			name: 'about',
			component: About,
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
