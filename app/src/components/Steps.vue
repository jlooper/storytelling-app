<template>
  <section>
    <b-steps
      :activeStep="currentStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item
        step="1"
        label="Create A Story"
        :clickable="isStepsClickable"
      ></b-step-item>

      <b-step-item
        step="2"
        label="Select Items for Story"
        :clickable="isStepsClickable"
      ></b-step-item>

      <b-step-item
        step="3"
        label="Manage Layout"
        :clickable="isStepsClickable"
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
      isStepsClickable: true,

      hasNavigation: false,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",

      currentStep: 0,
    };
  },
  props: ["activeStep"],
};
</script>
