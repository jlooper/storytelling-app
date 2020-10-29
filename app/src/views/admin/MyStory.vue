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
  methods: {
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2 * 1000);
    },
  },
  created() {
    this.openLoading();
    axios
      .post("/api/getAdminStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.myStoryItems = response.data;
        } else {
          this.uploadError = true;
        }
      })
      .catch((err) => {
        this.uploadError = true;
        console.error(err);
      });
  },
};
</script>
