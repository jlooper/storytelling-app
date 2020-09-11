<template>
	<main class="column is-four-fifths main is-pulled-right">
		<!--breadcrumbs-->
		<Steps activeStep="1" />
		<div class="box main-content">
			<h1 class="title">Tell a Story</h1>
			<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>

			<section>
				<!--<form @submit.prevent="upload">
					<div v-if="!image">
						<input
							class="input is-primary"
							type="file"
							name="filename"
							id="filename"
							@change="onFileChange"
						/>
					</div>
					<div v-else>
						<img :src="image" />
						<button class="button is-warning" @click="removeImage">Remove image</button>
						<input class="button is-link" type="submit" value="Upload Image" name="submit" />
					</div>
				</form>-->
			</section>
			<hr />
			<section>
				<form @submit.prevent="submit">
					<div v-if="!image">
						<input
							class="input is-primary"
							type="file"
							name="filename"
							id="filename"
							@change="onFileChange"
						/>
					</div>
					<div v-else>
						<img :src="image" />
						<button class="button is-warning" @click="removeImage">Remove image</button>
						<!--<input class="button is-link" type="submit" value="Upload Image" name="submit" />-->
					</div>
					<hr />
					<b-field label="Story Title">
						<b-input
							v-model.trim="title_field"
							required
							validation-message="Title is required"
							type="text"
						></b-input>
					</b-field>

					<button class="button is-link">Submit</button>
				</form>
			</section>
		</div>
		<div class="field is-grouped is-pulled-right">
			<div class="control">
				<button @click="goToStoryBuilder()" :disabled="!proceed" class="button is-info">Continue</button>
			</div>
		</div>
	</main>
</template>

<script>
import Steps from '@/components/Steps';

import axios from 'axios';

export default {
	components: {
		Steps,
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

			image: '',
			file: null,
			uploading: false,
			uploadError: false,
			imageInfo: null,
		};
	},
	methods: {
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			this.createImage(files[0]);
		},
		createImage(file) {
			this.file = file;
			var reader = new FileReader();
			reader.onload = (e) => {
				this.image = e.target.result;
			};
			reader.readAsDataURL(file);
		},
		removeImage: function() {
			this.image = '';
		},
		submit() {
			const formData = new FormData();
			formData.append('file', this.file);
			this.isLoading = true;
			axios
				.post('/api/uploadStoryImage', formData)
				.then((response) => {
					if (response.status === 200) {
						this.$buefy.toast.open(response.data.message);
						this.createStoryTitle(response.data.url);
					} else {
						this.uploadError = true;
					}
				})
				.catch((err) => {
					this.uploadError = true;
					console.error(err);
				});
		},

		createStoryTitle(URL) {
			axios
				.post('/api/createStory', {
					title: this.title_field,
					imageUrl: URL,
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
