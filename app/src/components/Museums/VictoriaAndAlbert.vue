<template>
	<section>
		<div class="box card m-5" v-for="(object, index) in VAObjects" :key="index">
			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<figure class="image is-128x128" style="max-height: 100px">
							<!--<img
								:src="createImageString(object.fields.primary_image_id)"
								:alt="object.fields.title"
								onerror="this.src='@/assets/no_image.jpg'"
              />-->
							<img src="@/assets/no_image.jpg" />
						</figure>
					</div>

					<div class="media-content">
						<p v-if="object.fields.title != ''" class="title is-4">{{ object.fields.title }}</p>
						<p v-if="object.fields.object != ''" class="subtitle is-6">{{ object.fields.object }}</p>
						<p v-if="object.fields.date_text != ''" class="subtitle is-6">
							Date: {{ object.fields.date_text }}
						</p>
						<p v-if="object.fields.location != ''" class="subtitle is-6">
							Location: {{ object.fields.location }}
						</p>
						<p v-if="object.fields.artist != ''" class="subtitle is-6">
							Artist: {{ object.fields.artist }}
						</p>
						<p v-if="object.fields.place != ''" class="subtitle is-6">Place: {{ object.fields.place }}</p>
						<p class="tag is-dark mt-3">Victoria and Albert Collection</p>
					</div>
					<div class="field is-grouped">
						<div class="control">
							<button class="button is-info" @click="createStoryItem(object)">Add to Story</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
var axios = require('axios');

export default {
	data() {
		return {
			VAObjects: [],
			rounded: false,
		};
	},
	methods: {
		createImageString(img_id) {
			if (img_id != null) {
				let image =
					'http://media.vam.ac.uk/collections/img/' +
					img_id.substr(0, 4) +
					'/' +
					img_id.substr(4, 2) +
					'/' +
					img_id +
					'_2500.jpg';

				return image;
			} else return '';
		},
		async startSearch(value) {
			var vaconfig = {
				method: 'get',
				url: 'https://www.vam.ac.uk/api/json/museumobject/search',
				params: {
					q: value,
				},
			};
			try {
				const response = await axios(vaconfig);
				this.VAObjects = response.data.records;
			} catch (error) {
				console.error(error);
			}
		},
		createStoryItem(object) {
			let image = this.createImageString(object.fields.primary_image_id);
			axios
				.post('/api/createStoryItem', {
					storyId: this.$route.params.id,
					image: image,
					artist: object.fields.artist,
					title: object.fields.title,
					type: object.fields.object,
					provenance: object.fields.place,
					date: object.fields.date_text,
					collection: 'Victoria and Albert',
				})

				.then((response) => {
					if (response.data.errorMessage == null) {
						this.$buefy.toast.open(response.data.message);
					} else {
						this.$buefy.toast.open(response.data.errorMessage);
					}
				})
				.catch(function(error) {
					this.$buefy.toast.open(error);
				});
		},
	},
	created() {
		this.$parent.$on('search', this.startSearch);
	},
};
</script>

<style scoped>
.image img {
	width: auto;
	max-height: 200px;
}
.title {
	text-align: left;
}
</style>
