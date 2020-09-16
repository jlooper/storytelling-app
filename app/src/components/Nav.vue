<template web>
	<div>
		<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<router-link class="navbar-item" :to="'/'">
					<span class="navbar-item is-size-3">Storytelling</span>
				</router-link>
				<a
					id="burger"
					role="button"
					class="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="menu"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="menu" class="navbar-menu">
				<div class="navbar-end">
					<router-link class="navbar-item" :to="'/about'">About</router-link>
					<router-link class="navbar-item" :to="'/admin'">Admin</router-link>
					<span v-if="userInfo" class="navbar-item" style="cursor:pointer" @click="logout">Logout</span>
				</div>
			</div>
		</nav>

		<div class="has-background-link m-4">
			<div v-if="userInfo">
				<p class="welcome has-text-white m-3">
					Welcome, {{ userInfo.userDetails }}! View your
					<router-link class="has-text-white has-text-bold" :to="'/admin/stories'">stories</router-link>
				</p>
			</div>
			<div v-else>&nbsp;</div>
		</div>
	</div>
</template>

<script web>
import { mapState } from 'vuex';

export default {
	name: 'my-navbar',
	computed: {
		...mapState(['userId']),
	},
	data() {
		return {
			isLoggedIn: false,
			userInfo: Object,
		};
	},
	methods: {
		logout() {
			this.$store.commit('clearUserId');
			this.isLoggedIn = false;
			const redirect = `post_logout_redirect_uri=/home`;
			const url = `/.auth/logout?${redirect}`;
			window.location.href = url;
		},
		async getUserInfo() {
			try {
				const response = await fetch('/.auth/me');
				const payload = await response.json();
				const { clientPrincipal } = payload;
				this.$store.commit('setUserId', clientPrincipal.userId);
				this.isLoggedIn = true;
				return clientPrincipal;
			} catch (error) {
				return undefined;
			}
		},
	},
	mounted() {
		var burger = document.getElementById('burger');
		var menu = document.getElementById('menu');
		burger.addEventListener('click', function() {
			burger.classList.toggle('is-active');
			menu.classList.toggle('is-active');
		});
	},
	async created() {
		this.userInfo = await this.getUserInfo();
		// eslint-disable-next-line no-console
		console.log(this.userInfo);
	},
};
</script>
