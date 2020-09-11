<template>
	<main class="column is-four-fifths main is-pulled-right">
		<div class="box main-content">
			<h1 class="title">Stories</h1>
			<hr />
			<div class="card" v-for="story in stories" :key="story.id">
				<div class="card-image">
					<figure class="image is-4by3">
						<img
							:src="
								'https://cooperhewittstorage.blob.core.windows.net/images/' +
									story.imageUrl +
									'?sp=rl&st=2020-09-11T02:45:14Z&se=2021-12-12T02:45:00Z&sv=2019-12-12&sr=c&sig=ineO%2FmFbKg2t5nFyfg9AO%2Ft4wTDvDrKdBPoPjhA0%2F78%3D'
							"
							:alt="story.title"
						/>
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
