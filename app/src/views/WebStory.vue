<template>
  <div>
    <WebEndlessScrollView
      v-bind:storyItems="allStoryItems"
      v-bind:admin="false"
    />
  </div>
</template>
<script>
import axios from "axios";
import LayoutPreview from "@/layouts/LayoutPreview.vue";

import WebEndlessScrollView from "@/components/WebEndlessScrollView";
export default {
  data() {
    return {
      allStoryItems: [],
    };
  },
  components: {
    WebEndlessScrollView,
  },
  created() {
    this.$emit(`update:layout`, LayoutPreview);

    axios
      .post("/api/getStoryItems", {
        id: this.$route.params.id,
      })
      .then((response) => {
        if (response.status === 200) {
          this.allStoryItems = response.data;
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
