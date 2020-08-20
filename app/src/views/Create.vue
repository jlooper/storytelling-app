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
			<hr />
			<form @submit.prevent="submit">
				<div class="field">
					<label class="label">Story Title</label>
					<div class="control">
						<input :class="validClass" v-model.trim="$v.title_field.$model" type="text" />
					</div>
				</div>
				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>
<style scoped>
p {
	margin-bottom: 20px;
}
</style>
<script>
import { required } from 'vuelidate/lib/validators';

import axios from 'axios';

export default {
	validations: {
		title_field: {
			required,
		},
	},
	data() {
		return {
			submitStatus: null,
			isLoading: false,
			message: '',
			validClass: 'input',
			title_field: null,
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
		};
	},
	methods: {
		submit() {
			this.$v.$touch();
			if (this.title_field == null) {
				this.submitStatus = 'ERROR';
				this.validClass = 'input is-danger';
			} else {
				this.submitStatus = 'PENDING';
				this.validClass = 'input';
				//submit title of story
				axios
					.post('/api/stories/create', {
						title: this.title_field,
					})
					.then((response) => {
						console.log(response);
						if (response.data.errorMessage == null) {
							//this.$router.push({ path: "/login" });
						} else {
							this.message = response.data.errorMessage;
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
	},
};
</script>
