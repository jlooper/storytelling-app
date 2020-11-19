<template>
  <div id="app" class="is-family-sans-serif">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>
<script>
export default {
  data() {
    return {
      layout: "div",
    };
  },
};
</script>

