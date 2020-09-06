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
					label="Enhance Story Items"
					:clickable="isStepsClickable"
					disabled
				></b-step-item>
			</b-steps>
		</section>
		<div class="box main-content">
			<h1 class="title">
				Customize your Story
				<span class="is-italic">{{ title }}</span>
			</h1>
			<hr />
		</div>

		<b-field grouped>
			<b-field label="Story Element">
				<b-select>
					<option>Narrative</option>
					<option>Provenance</option>
					<option>Tags</option>
				</b-select>
			</b-field>
			<b-field label="Text" expanded>
				<b-input></b-input>
			</b-field>
		</b-field>
		<b-field grouped>
			<b-field label="Story Element">
				<b-select>
					<option>Narrative</option>
					<option>Provenance</option>
					<option>Tags</option>
				</b-select>
			</b-field>
			<b-field label="Text" expanded>
				<b-input></b-input>
			</b-field>
		</b-field>
		<b-field grouped>
			<b-field label="Story Element">
				<b-select>
					<option>Narrative</option>
					<option>Provenance</option>
					<option>Tags</option>
				</b-select>
			</b-field>
			<b-field label="Text" expanded>
				<b-input></b-input>
			</b-field>
		</b-field>

		<div class="field is-grouped">
			<div class="control">
				<button class="button is-info">Build</button>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	name: 'Storybuilder',
	data() {
		return {
			isLoading: false,
			isFullPage: false,
			activeStep: 3,
			showSocial: false,
			isAnimated: true,
			isRounded: true,
			isStepsClickable: false,
			hasNavigation: false,
			customNavigation: false,
			isProfileSuccess: false,
			labelPosition: 'bottom',
			mobileMode: 'minimalist',
			prevIcon: '',
			nextIcon: '',
			title: '',
		};
	},
	created() {
		this.title = this.$route.params.title;
	},
};
</script>
