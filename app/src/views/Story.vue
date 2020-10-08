<template>
	<div>
		<h1 class="title">Story Elements</h1>
		<EndlessScrollView v-bind:storyItems="allStoryItems" v-bind:admin="false" />
	</div>
</template>
<script>
import axios from 'axios';
import EndlessScrollView from '../components/EndlessScrollView';
export default {
	data() {
		return {
			allStoryItems: [],
		};
	},
	components: {
		EndlessScrollView,
	},
	created() {
		axios
			.post('/api/getStoryItems', { id: this.$route.params.id })
			.then((response) => {
				if (response.status === 200) {
					this.allStoryItems = response.data;
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
