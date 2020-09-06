<template>
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
</template>
<script>
export default {
	data() {
		return {
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
	props: ['activeStep'],
	created() {
		console.log(this.activeStep);
	},
};
</script>
