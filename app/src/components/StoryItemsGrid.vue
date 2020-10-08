<template>
	<section>
		<div class="columns is-multiline">
			<hr />
			<div class="column is-4" v-for="item in storyItems" :key="item.id">
				<div class="card" v-if="item.type == 'tweet'">
					<p class="card-header-title is-size-4">
						<span class="pt-3 icon has-text-grey-light">
							<i class="fab fa-twitter fa-2x"></i>
						</span>
					</p>
					<hr />

					<span v-html="htmlDecode(item.content)"></span>
				</div>
				<div v-else-if="item.type == 'video'">
					<span v-html="htmlDecode(item.content)"></span>
				</div>
				<div class="card" v-else-if="item.type == 'link'">
					<p class="card-header-title is-size-4">
						<span class="pt-3 icon has-text-grey-light">
							<i class="fa fa-link fa-2x"></i>
						</span>
					</p>
					<hr />
					<span v-html="item.content"></span>
				</div>
				<div class="card" v-else-if="item.type == 'text'">
					<p class="card-header-title is-size-4">
						<span class="pt-3 icon has-text-grey-light">
							<i class="fa fa-pen fa-2x"></i>
						</span>
					</p>
					<hr />
					<span v-html="item.content"></span>
				</div>
				<div class="card" v-else>
					<p class="card-header-title is-size-4">{{ item.title }}</p>

					<div class="columns card-content">
						<div class="column card-image">
							<figure class="image is-ratio">
								<img :src="item.image" alt="Image" />
							</figure>
						</div>
						<div class="column">
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
					<footer style="position: absolute; bottom: 0px" v-if="admin" class="card-footer">
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
		htmlDecode(input) {
			var doc = new DOMParser().parseFromString(input, 'text/html');
			return doc.documentElement.textContent;
		},
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
				path: '/admin/story/search',
				name: 'search',
				params: { id: this.$route.params.id },
			});
		},
		addMetaDataToStory() {
			this.$router.push({
				path: '/admin/story/metadata',
				name: 'addmetadata',
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
		setStoryLayout() {
			this.$router.push({
				path: '/admin/story/storylayout/',
				name: 'storylayout',
				params: { id: this.$route.params.id },
			});
		},
	},
};
</script>
