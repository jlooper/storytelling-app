<template>
  <div>
    <h1 class="title">Story Elements</h1>
    <StoryItemsGrid v-bind:storyItems="myStoryItems" v-bind:admin="true" />
  </div>
</template>
<script>
import axios from "axios";
import StoryItemsGrid from "@/components/StoryItemsGrid";
export default {
  components: {
    //draggable,
    StoryItemsGrid,
  },
  data() {
    return {
      myStoryItems: [],
      nodes: [],
      connections: [],
      editable: true,
      //...map,
    };
  },

  created() {
    axios
      .post("/api/getStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.myStoryItems = response.data;
          console.log(this.nodes);
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
