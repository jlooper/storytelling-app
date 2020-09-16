<template>
	<div>
		<h1 class="title">Drag to Reorder Story Elements</h1>
		<div class="columns is-multiline">
			<hr />
			<draggable
				class="column is-half "
				v-model="storyItems"
				group="items"
				@start="drag = true"
				@end="drag = false"
			>
				<div class="box" v-for="item in storyItems" :key="item.id">
					<div class="columns">
						<div class="column">
							<figure class="image is-128x128" v-for="(o, index) in item.items.images" :key="index">
								<img v-if="index == 0" :src="o.b.url" :alt="item.items.title" />
							</figure>
						</div>
						<div class="column">
							<h2 class="is-size-4">{{ item.items.title }}</h2>
							<p>{{ item.items.description }}</p>
							<p>{{ item.items.medium }}</p>
						</div>
					</div>
				</div>
			</draggable>
		</div>
	</div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from 'axios';
export default {
	components: {
		draggable,
	},
	data() {
		return {
			storyItems: [],
		};
	},
	created() {
		axios
			.post('/api/getStoryItems', { id: this.$route.params.id })
			.then((response) => {
				if (response.status === 200) {
					this.storyItems = response.data;
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
