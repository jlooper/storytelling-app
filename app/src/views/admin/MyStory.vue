<template>
  <div class="columns">
    <div class="column">
      <b-loading
        :is-full-page="isFullPage"
        v-model="isLoading"
        :can-cancel="true"
      ></b-loading>
      <h1 class="title">Story Elements</h1>
      <!--breadcrumbs-->
      <Breadcrumbs active="0" />
      <h2 class="subtitle" v-if="myStoryItems.length == 0">
        There are no story items yet. Use the links above to add items to this
        story.
      </h2>
      <StoryItemsGrid v-bind:storyItems="myStoryItems" v-bind:admin="true" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import StoryItemsGrid from "@/components/StoryItemsGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  components: {
    StoryItemsGrid,
    Breadcrumbs,
  },
  data() {
    return {
      myStoryItems: [],
      nodes: [],
      connections: [],
      editable: true,
      isLoading: false,
      isFullPage: true,
    };
  },

  created() {
    this.$emit(`update:layout`, LayoutDefault);
    this.isLoading = true;
    axios
      .post("/api/getAdminStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.isLoading = false;
          this.myStoryItems = response.data;
        } else {
          this.isLoading = false;
          this.$buefy.toast.open(response.data.message);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.$buefy.toast.open(err);
      });
  },
};
</script>
