<template>
	<main class="column is-four-fifths main is-pulled-right">
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
				return axios.post(`/api/stories/create`, { title: this.title_field });
			}
		},
	},
};
</script>
