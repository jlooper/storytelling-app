<template>
	<main class="column is-four-fifths main is-pulled-right pb-100">
		<Steps activeStep="3" />
		<div class="columns">
			<div class="column is-full">
				<section class="box main-content">
					<h1 class="title">Layout this Story</h1>
					<hr />
					<grid-layout
						:layout.sync="layout"
						:col-num="storyItems.length"
						:row-height="50"
						:is-draggable="true"
						:is-resizable="true"
						:is-mirrored="false"
						:vertical-compact="true"
						:margin="[10, 10]"
						:use-css-transforms="true"
					>
						<grid-item
							v-for="item in layout"
							:x="item.x"
							:y="item.y"
							:w="item.w"
							:h="item.h"
							:i="item.i"
							:key="item.i"
						>
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
								<span v-html="item.content"></span>
							</div>

							<div class="card" v-else-if="item.type == 'text'">
								<span v-html="item.content"></span>
							</div>

							<div class="card" v-else>
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
							</div>
						</grid-item>
					</grid-layout>
				</section>
			</div>
		</div>
	</main>
</template>
<script>
import axios from 'axios';
import VueGridLayout from 'vue-grid-layout';
import Steps from '@/components/Steps';
export default {
	name: 'storylayout',
	data() {
		return {
			loading: false,
			isStatic: false,
			layout: [],
			storyItems: [],
		};
	},
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem,
		Steps,
	},
	created() {
		axios
			.post('/api/getStoryItems', { id: this.$route.params.id })
			.then((response) => {
				if (response.status === 200) {
					this.storyItems = response.data;
					console.log(this.storyItems);
					for (var i = 0; i < this.storyItems.length; i++) {
						this.layout.push({
							x: 0 + i,
							y: 0,
							w: 5,
							h: 5,
							i: this.storyItems[i].id,
							title: this.storyItems[i].title || '',
							desc: this.storyItems[i].description || '',
							image: this.storyItems[i].image || '',
							medium: this.storyItems[i].medium || '',
							provenance: this.storyItems[i].provenance || '',
							artist: this.storyItems[i].artist || '',
							date: this.storyItems[i].date || '',
							content: this.storyItems[i].content || '',
							type: this.storyItems[i].type || '',
							collection: this.storyItems[i].collection || '',
						});
					}
				} else {
					this.error = true;
				}
			})
			.catch((err) => {
				this.error = err;
			});
	},
	methods: {
		htmlDecode(input) {
			var doc = new DOMParser().parseFromString(input, 'text/html');
			return doc.documentElement.textContent;
		},
	},
};
</script>
<style scoped>
.vue-grid-item {
	border: 1px solid black;
}
.card {
	min-height: auto;
	overflow: hidden;
	background-color: transparent;
	box-shadow: none;
}
</style>
