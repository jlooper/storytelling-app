<template>
	<div class="columns is-multiline">
		<div class="column is-full" v-for="item in storyItems" :key="item.id">
			<div class="card" v-if="item.type == 'tweet'">
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
				<article class="media">
					<figure class="media-left">
						<p class="image is-128x128">
							<img :src="item.image" alt="Image" />
						</p>
					</figure>

					<div class="media-content">
						<div class="content">
							<p class="is-size-3">
								{{ item.title }}
							</p>
							<br />
							<p style="text-overflow: ellipsis">{{ item.description }}</p>
							<p>{{ item.medium }}</p>
							<p>{{ item.provenance }}</p>
							<p>{{ item.artist }}</p>
							<p>{{ item.date }}</p>
							<p class="tag">{{ item.collection }}</p>
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: { storyItems: Array, admin: Boolean },
	methods: {
		htmlDecode(input) {
			var doc = new DOMParser().parseFromString(input, 'text/html');
			return doc.documentElement.textContent;
		},
	},
};
</script>
