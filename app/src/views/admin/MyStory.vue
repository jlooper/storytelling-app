<template>
  <div>
    <h1 class="title">Story Elements</h1>
    <StoryGrid v-bind:storyItems="storyItems" v-bind:admin="true" />
  </div>
</template>
<script>
import axios from "axios";
import StoryGrid from "@/components/StoryGrid";
export default {
  components: {
    //draggable,
    StoryGrid,
  },
  data() {
    return {
      storyItems: [],
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
          this.storyItems = response.data;
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
