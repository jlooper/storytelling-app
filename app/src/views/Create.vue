<template>
	<main class="column is-four-fifths main is-pulled-right">
		<section>
			<b-steps
				v-model="activeStep"
				:animated="isAnimated"
				:rounded="isRounded"
				:has-navigation="hasNavigation"
				:icon-prev="prevIcon"
				:icon-next="nextIcon"
				:label-position="labelPosition"
				:mobile-mode="mobileMode"
			>
				<b-step-item step="1" label="Create A Story" :clickable="isStepsClickable"></b-step-item>

				<b-step-item
					step="2"
					label="Select Items for Story"
					:clickable="isStepsClickable"
					:type="{ 'is-success': isProfileSuccess }"
				></b-step-item>

				<b-step-item
					:step="showSocial ? '4' : '3'"
					label="Manage Layout"
					:clickable="isStepsClickable"
					disabled
				></b-step-item>
			</b-steps>
		</section>

		<div class="box main-content">
			<h1 class="title">Tell a Story</h1>
			<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
			<hr />
			<form @submit.prevent="submit">
				<div class="field">
					<label class="label">Story Title</label>
					<div class="control">
						<input :class="validClass" v-model.trim="$v.title_field.$model" type="text" />
					</div>
				</div>
				<picture-input
					ref="pictureInput"
					@change="onChange"
					width="600"
					height="444"
					accept="image/jpeg, image/png"
					:removable="true"
					:customStrings="{
						upload: '<h1>Sorry!</h1>',
						drag: 'Upload an image',
					}"
				></picture-input>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link">Submit</button>
					</div>
				</div>
			</form>
		</div>
		<div class="field is-grouped is-pulled-right">
			<div class="control">
				<button @click="goToStoryBuilder()" :disabled="!proceed" class="button is-info">Continue</button>
			</div>
		</div>
	</main>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import PictureInput from 'vue-picture-input';

import axios from 'axios';

export default {
	validations: {
		title_field: {
			required,
		},
	},
	components: {
		PictureInput,
	},
	data() {
		return {
			proceed: false,
			isLoading: false,
			isFullPage: false,
			submitStatus: null,
			validClass: 'input',
			title_field: null,
			storyId: null,
			storyTitle: null,
			loadingComponent: null,
			activeStep: 0,

			showSocial: false,
			isAnimated: true,
			isRounded: true,
			isStepsClickable: false,

			hasNavigation: false,
			customNavigation: false,
			isProfileSuccess: false,

			prevIcon: 'chevron-left',
			nextIcon: 'chevron-right',
			labelPosition: 'bottom',
			mobileMode: 'minimalist',

			image: null,
			uploading: false,
			uploadError: false,
			imageInfo: null,
		};
	},
	methods: {
		onChange(image) {
			this.ctx = this.$refs.pictureInput.$refs.previewCanvas.getContext('2d');
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			let cleanedImage = image.replace('data:image/png;base64,', '');
			console.log('New picture selected!', cleanedImage);
			if (cleanedImage) {
				this.upload(cleanedImage);
			} else {
				console.log('FileReader API not supported');
			}
		},
		upload(file) {
			if (file) {
				this.imageInfo = null;
				this.uploading = true;
				this.uploadError = false;
				axios
					.post('/api/uploadStoryImage', file)
					.then((response) => {
						if (response.status === 200) {
							console.log('Image uploaded successfully');
							this.uploading = false;
							this.imageInfo = JSON.parse(response.data);
						} else {
							this.uploadError = true;
						}
					})
					.catch((err) => {
						this.uploading = false;
						this.uploadError = true;
						console.error(err);
					});
			}
		},

		submit() {
			this.isLoading = true;
			this.$v.$touch();
			if (this.title_field == null) {
				this.submitStatus = 'ERROR';
				this.validClass = 'input is-danger';
			} else {
				this.submitStatus = 'PENDING';
				this.validClass = 'input';
				//submit title of story
				axios
					.post('/api/createStory', {
						title: this.title_field,
					})
					.then((response) => {
						this.isLoading = false;
						if (response.data.errorMessage == null) {
							this.$buefy.toast.open(response.data.message);

							this.proceed = !this.proceed;
							//todo - vuex
							this.storyId = response.data.id;
							this.storyTitle = response.data.title;
						} else {
							this.$buefy.toast.open(response.data.message);
						}
					})
					.catch(function(error) {
						this.isLoading = false;
						console.log(error);
					});
			}
		},
		goToStoryBuilder() {
			this.$router.push({
				path: '/Search',
				name: 'search',
				params: { id: this.storyId, title: this.storyTitle },
			});
		},
	},
};
</script>

<style scoped>
p {
	margin-bottom: 20px;
}
</style>
