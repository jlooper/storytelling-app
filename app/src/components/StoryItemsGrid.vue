<template>
	<section>
		<div class="columns container" v-if="admin">
			<div class="column">
				<button class="button is-info" @click="addToStory()">Add Items to Story</button>
			</div>
		</div>
		<div class="columns is-multiline">
			<hr />
			<div class="column is-3" v-for="item in storyItems" :key="item.id">
				<div class="card">
					<p class="card-header-title is-size-4">{{ item.title }}</p>

					<div class="columns">
						<div class="column card-image">
							<figure class="image is-ratio">
								<img :src="item.image" alt="Image" />
							</figure>
						</div>
						<div class="column card-content">
							<div class="content">
								<p style="text-overflow: ellipsis">{{ item.description }}</p>
								<p>{{ item.medium }}</p>
								<p>{{ item.provenance }}</p>
								<p>{{ item.artist }}</p>
								<p>{{ item.date }}</p>
								<p class="tag">{{ item.collection }}</p>
							</div>
						</div>
					</div>
					<footer style="position: absolute; bottom: 0px;" v-if="admin" class="card-footer">
						<a href="#" @click="goToStoryCustomizer(item.id, item.title)" class="card-footer-item">Edit</a>
						<a href="#" class="card-footer-item" @click="deleteItem(item.id, item.title)"
							>Remove From Story</a
						>
					</footer>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
export default {
	props: { storyItems: Array, admin: Boolean },
	methods: {
		deleteItem(id, title) {
			axios
				.post('/api/deleteStoryItem', { id: id, title: title })
				.then((response) => {
					this.$buefy.toast.open(response.data.message);
				})
				.catch((err) => {
					this.$buefy.toast.open(err);
				});
		},
		addToStory() {
			this.$router.push({
				path: '/admin/search',
				name: 'search',
				params: { id: this.$route.params.id },
			});
		},
		goToStoryCustomizer(id, title) {
			this.$router.push({
				path: '/admin/storycustomizer/',
				name: 'storycustomizer',
				params: { id: id, title: title },
			});
		},
	},
};
</script>
