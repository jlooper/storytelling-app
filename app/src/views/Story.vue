<template>
  <main>
    <h1>Story items</h1>
    <pre>{{storyItems}}</pre>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      storyItems: [],
    };
  },
  created() {
    axios
      .post("/api/getStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.storyItems = response.data;
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
