<template>
  <main class="column is-four-fifths main is-pulled-right">
    <h1 class="title">Stories</h1>
    <StoryGrid v-bind:stories="allStories" v-bind:admin="false" />
  </main>
</template>
<script>
import axios from "axios";
import StoryGrid from "@/components/StoryGrid";
export default {
  components: {
    StoryGrid,
  },
  data() {
    return {
      allStories: [],
    };
  },
  created() {
    this.isLoading = true;
    axios
      .get("/api/getStories")
      .then((response) => {
        this.isLoading = false;
        if (response.status === 200) {
          this.allStories = response.data;
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
