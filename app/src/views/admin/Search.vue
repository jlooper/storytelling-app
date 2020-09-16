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
		<section class="mb-20">
			<button @click="goToStoryCustomizer()" class="button is-link is-pulled-right">Continue</button>
		</section>
		<section class="is-pulled-left">
			<CooperHewitt />
			<VictoriaAndAlbert />
		</section>
	</main>
</template>
<script>
import Steps from '@/components/Steps';
import CooperHewitt from '@/components/Museums/CooperHewitt';
import VictoriaAndAlbert from '@/components/Museums/VictoriaAndAlbert';

export default {
	components: {
		Steps,
		CooperHewitt,
		VictoriaAndAlbert,
	},
	props: {
		searchString: String,
	},
	data() {
		return {
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
		submit() {
			this.$emit('search', this.search_field);
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
