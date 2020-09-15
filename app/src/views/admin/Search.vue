<template>
	<main class="column is-four-fifths main is-pulled-right pb-100">
		<Steps activeStep="2" />
		<section class="box main-content">
			<h1 class="title has-text-info">{{ storyTitle }}</h1>
			<h2 class="title">Search for items to add to this story</h2>
			<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
			<hr />
			<form @submit.prevent="submit">
				<b-field label="Search">
					<b-input
						v-model.trim="search_field"
						required
						validation-message="Search field is required"
						type="text"
					></b-input>
				</b-field>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link">Search</button>
					</div>
				</div>
			</form>
		</section>
		<section class="is-pulled-right mb-20">
			<button @click="goToStoryCustomizer()" class="button is-link">Continue</button>
		</section>

		<section>
			<hr />
			<p class="is-size-4 has-text-left has-text-link">Story box</p>

			<draggable class="drop-box" v-model="myStories"></draggable>
			<p class="is-size-4 has-text-left has-text-link">Drag cards to story box to create your story</p>
		</section>

		<CooperHewitt />

		<!--VA-->

		<div>
			<div class="box card m-5" v-for="(object, index) in VAObjects" :key="index">
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<!--<figure v-if="object.hasImage" class="image is-128x128" style="max-height: 100px">
								<img :src="object.webImage.url" :alt="object.title" />
							</figure>-->
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
							<p v-if="object.fields.place != ''" class="subtitle is-6">
								Plact: {{ object.fields.place }}
							</p>
						</div>
						<div class="media-content">
							<span class="tag is-dark mt-3">Victoria and Albert Collection</span>
						</div>
						<!--<div class="field is-grouped">
							<div class="control">
								<button class="button is-info" @click="addToStory(object)">Add to Story</button>
							</div>
						</div>-->
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
var axios = require('axios');
import Steps from '@/components/Steps';
import CooperHewitt from '@/components/Museums/CooperHewitt';
import draggable from 'vuedraggable';
export default {
	components: {
		Steps,
		draggable,
		CooperHewitt,
	},
	props: {
		searchString: String,
	},
	data() {
		return {
			//CooperHewittMuseumObjects: [],
			VAObjects: [],
			storyTitle: '',
			message: '',
			search_field: null,
			isLoading: false,
			isFullPage: false,
			myStories: [],
			storyId: '',
		};
	},
	methods: {
		async submit() {
			this.$emit('search', this.search_field);
			this.isLoading = true;
			//this.CooperHewittMuseumObjects = [];
			this.VAObjects = [];

			var vaconfig = {
				method: 'get',
				url: 'https://www.vam.ac.uk/api/json/museumobject/search',
				params: {
					q: this.search_field,
				},
			};

			/*const firstrequest = axios(chconfig).then((response) => {
				this.CooperHewittMuseumObjects = response.data.objects;
			});*/

			const secondrequest = axios(vaconfig).then((response) => {
				this.VAObjects = response.data.records;
			});

			axios
				.all([/*axios(firstrequest), */ axios(secondrequest)])
				.then((this.isLoading = false))
				.catch((error) => console.log(error));
		},

		createStoryItem(object) {
			axios
				.post('/api/createStoryItem', {
					storyId: this.$route.params.id,
					item: object,
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
		goToStoryCustomizer() {
			this.$router.push({
				path: '/StoryCustomizer',
				name: 'storycustomizer',
				params: { id: this.$route.params.id, title: this.storyTitle },
			});
		},
	},
	created() {
		this.storyId = this.$route.params.id;
		this.storyTitle = this.$route.params.title;
	},
};
</script>

<style scoped>
.image img {
	width: auto;
	max-height: 200px;
}
.drop-box {
	height: 200px;
	margin: 10px;
	background-color: #eee;
	border-radius: 5px;
}
</style>
