<template>
	<div class="has-background-base">
		<aside v-show="showMenu" class="column is-one-fifth aside is-pulled-left">
			<nav class="menu">
				<ul class="menu-list">
					<li>
						<router-link class="navbar-item" :to="'/admin/profile'">
							<i class="fas fa-user"></i> My Profile
						</router-link>
					</li>
					<li>
						<router-link class="navbar-item" :to="'/admin/stories'">
							<i class="fas fa-book"></i> My Stories
						</router-link>
					</li>
				</ul>
			</nav>
		</aside>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	computed: {
		...mapState(['user']),
		showMenu() {
			return this.$router.app._route.name !== 'home';
		},
	},
	data: () => ({
		//currentUser: firebase.auth().currentUser,
	}),
	methods: {
		...mapActions(['fetchUser']),
	},
};
</script>
