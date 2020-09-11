<template>
	<main class="column is-four-fifths main is-pulled-right">
		<h1 class="title">Stories</h1>
		<div class="box main-content columns">
			<hr />
			<div class="card column" v-for="story in stories" :key="story.id">
				<div class="card-image">
					<figure class="image is-4by3">
						<img :src="buildImageUrl(story.imageUrl)" :alt="story.title" />
					</figure>
				</div>
				<div class="card-content">
					<div class="media">
						<div class="media-left"></div>
						<div class="media-content">
							<p class="title is-4">{{ story.title }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import axios from 'axios';
export default {
	data() {
		return {
			stories: [],
		};
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
			.get('/api/getStories')
			.then((response) => {
				if (response.status === 200) {
					this.stories = response.data;
					console.log(this.stories);
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
