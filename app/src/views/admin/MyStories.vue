<template web>
  <main class="column is-four-fifths main is-pulled-right">
    <h1 class="title">My Stories</h1>
    <StoryGrid v-bind:stories="myStories" v-bind:admin="true" />
    <router-link class="button is-large is-link" :to="'create'">Create a Story</router-link>
  </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import StoryGrid from "@/components/StoryGrid";
export default {
  components: {
    StoryGrid,
  },
  data() {
    return {
      myStories: [],
    };
  },

  computed: {
    ...mapState(["userId"]),
  },
  methods: {
    buildImageUrl(url) {
      //build the url for access to image
      let string = url;
      let imageName = string.substring(string.lastIndexOf("/") + 1);
      return (
        "https://cooperhewittstorage.blob.core.windows.net/images/" +
        imageName +
        "?sp=rl&st=2020-09-11T02:45:14Z&se=2021-12-12T02:45:00Z&sv=2019-12-12&sr=c&sig=ineO%2FmFbKg2t5nFyfg9AO%2Ft4wTDvDrKdBPoPjhA0%2F78%3D"
      );
    },
  },
  created() {
    axios
      .post("/api/getUserStories", { userId: this.userId })
      .then((response) => {
        if (response.status === 200) {
          this.myStories = response.data;
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
