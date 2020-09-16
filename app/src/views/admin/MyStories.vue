<template web>
	<main class="column is-four-fifths main is-pulled-right">
		<h1 class="title">Stories</h1>
		<div class="main-content columns is-multiline">
			<hr />
			<div class="card column is-one-quarter" v-for="story in myStories" :key="story.id">
				<div class="card-image">
					<figure class="image is-4by3">
						<img :src="buildImageUrl(story.imageUrl)" :alt="story.title" />
					</figure>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-left"></div>
						<div class="media-content">
							<router-link :to="{ path: '/admin/story/' + story.id + '' }" class="title is-4">{{
								story.title
							}}</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>

		<router-link class="button is-large is-link" :to="'create'">Create a Story</router-link>
	</main>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
	name: 'profile',
	data() {
		return {
			myStories: [],
		};
	},

	computed: {
		...mapState(['userId']),
	},
	methods: {
		buildImageUrl(url) {
			//build the url for access to image
			let string = url;
			let imageName = string.substring(string.lastIndexOf('/') + 1);
			return (
				'https://cooperhewittstorage.blob.core.windows.net/images/' +
				imageName +
				'?sp=rl&st=2020-09-11T02:45:14Z&se=2021-12-12T02:45:00Z&sv=2019-12-12&sr=c&sig=ineO%2FmFbKg2t5nFyfg9AO%2Ft4wTDvDrKdBPoPjhA0%2F78%3D'
			);
		},
	},
	created() {
		axios
			.post('/api/getUserStories', { userId: this.userId })
			.then((response) => {
				if (response.status === 200) {
					this.myStories = response.data;
				} else {
					this.uploadError = true;
				}
			})
			.catch((err) => {
				this.uploadError = true;
				console.error(err);
			});
	},
};
</script>
<style scoped>
.box {
	margin: 5px;
}

h3 {
	padding-bottom: 20px;
}
</style>
