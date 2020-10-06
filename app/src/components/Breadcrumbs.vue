<template>
  <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link :to="'/admin/story/search/' + this.currId"
          >Search for Elements</router-link
        >
      </li>
      <li>
        <router-link :to="'/admin/story/metadata/' + this.currId"
          >Add Metadata to Story</router-link
        >
      </li>
      <li>
        <router-link :to="'/admin/story/layout/' + this.currId"
          >Create Layout</router-link
        >
      </li>
      <!--<li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>-->
    </ul>
  </nav>
</template>
<script>
export default {
    
  props: ["active"],
  data() {
    return {
      currId: this.$route.params.id,
    };
  },
};
</script>