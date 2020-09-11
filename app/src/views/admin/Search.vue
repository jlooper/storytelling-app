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
		<div class="is-pulled-left">
			<div class="box card m-5" v-for="(object, index) in CooperHewittMuseumObjects" :key="index">
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-128x128" v-for="(o, index) in object.images" :key="index">
								<img v-if="index == 0" :src="o.b.url" :alt="object.title" />
							</figure>
						</div>
						<div class="media-content">
							<p>
								<a :href="object.url != ''" target="_blank" class="title is-4">{{ object.title }}</a>
							</p>
							<p v-if="object.medium != ''" class="subtitle is-6">{{ object.medium }}</p>
							<p v-if="object.label_text != ''" class="subtitle is-6">{{ object.label_text }}</p>
							<p v-if="object.accession_number != ''" class="subtitle is-6">
								Accession Number: {{ object.accession_number }}
							</p>
							<p v-if="object.id" class="subtitle is-6">Object Id: {{ object.id }}</p>
							<p v-if="object.creditline != ''">{{ object.creditline }}</p>
							<br />
							<time datetime="2016-1-1">Acquired {{ object.year_acquired }}</time>
							<br />
							<p class="tag is-primary mt-3">Cooper Hewitt Museum Collection</p>
						</div>
						<div class="field is-grouped">
							<div class="control">
								<button class="button is-info" @click="createStoryItem(object)">
									Add to Story
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--Rijks-->

		<!--<div>
			<div class="box card m-5" v-for="(object, index) in RijksMuseumObjects" :key="index">
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure v-if="object.hasImage" class="image is-128x128" style="max-height: 100px">
								<img :src="object.webImage.url" :alt="object.title" />
							</figure>
						</div>
						<div class="media-content">
							<p>
								<a :href="object.links.web != ''" target="_blank" class="title is-4">
									{{ object.title }}
								</a>
							</p>
							<p>Principal or First Maker: {{ object.principalOrFirstMaker }}</p>
							<p v-for="p in object.productionPlaces" :key="p.id">{{ p }}</p>
							<span class="tag is-dark mt-3">Rijksmuseum Collection</span>
						</div>
						<div class="field is-grouped">
							<div class="control">
								<button class="button is-info" @click="addToStory(object)">Add to Story</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>-->
	</main>
</template>
<script>
var axios = require('axios');
import Steps from '@/components/Steps';
export default {
	components: {
		Steps,
	},
	data() {
		return {
			CooperHewittMuseumObjects: [],
			RijksMuseumObjects: [],
			storyTitle: '',
			message: '',
			search_field: null,
			isLoading: false,
			isFullPage: false,

			storyId: '',
		};
	},
	methods: {
		async submit() {
			this.isLoading = true;
			this.CooperHewittMuseumObjects = [];
			this.RijksMuseumObjects = [];
			var chconfig = {
				method: 'get',
				url: 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects',
				headers: {},
				params: {
					access_token: '5a3c42c653014805fd1e06902631596f',
					query: this.search_field,
					page: 1,
					per_page: 10,
				},
			};

			/*var rijksconfig = {
					method: 'get',
					url: 'https://www.rijksmuseum.nl/api/nl/collection?key=PqVYN24g',
					params: {
						q: this.search_field,
						p: 1,
						ps: 10,
						st: 'Objects',
					},
				};
*/
			const firstrequest = axios(chconfig).then((response) => {
				this.CooperHewittMuseumObjects = response.data.objects;
			});

			/*const secondrequest = axios(rijksconfig).then((response) => {
					this.RijksMuseumObjects = response.data.artObjects;
				});*/

			axios
				.all([axios(firstrequest) /*, axios(secondrequest)*/])
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
						this.$buefy.toast.open(response.data.message);
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
</style>
