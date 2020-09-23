<template>
  <div class="columns">
    <div class="column">
      <h1 class="title">Story Elements</h1>
      <StoryItemsGrid v-bind:storyItems="myStoryItems" v-bind:admin="true" />
    </div>
    <div class="column is-one-quarter pr-0">
      <aside class="pt-3 has-background-light">
        <span class="navbar-item">
          <span>INVENTORY</span>
        </span>
      </aside>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import StoryItemsGrid from "@/components/StoryItemsGrid";
export default {
  components: {
    StoryItemsGrid,
  },
  data() {
    return {
      myStoryItems: [],
      nodes: [],
      connections: [],
      editable: true,
    };
  },

  created() {
    axios
      .post("/api/getStoryItems", { id: this.$route.params.id })
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
