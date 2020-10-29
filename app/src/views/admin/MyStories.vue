<template web>
  <main class="column is-four-fifths main is-pulled-right">
    <h1 class="title">My Stories</h1>
    <StoryGrid v-bind:stories="myStories" v-bind:admin="true" />
    <span
      class="button is-large is-primary is-uppercase mx-4 my-5"
      @click="createStory"
      >Create a Story by Searching</span
    ><router-link class="button is-large is-link mx-4 my-5" :to="'create'"
      >Create a Story with a Title</router-link
    >
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
    createStory() {
      axios
        .post("/api/createStory", {
          title: "New Story",
          imageUrl:
            "https://cooperhewittstorage.blob.core.windows.net/images/no_image.jpg",
          userId: this.userId,
        })
        .then((response) => {
          this.isLoading = false;
          if (response.data.errorMessage == null) {
            this.$buefy.toast.open(response.data.message);

            this.proceed = !this.proceed;
            this.storyId = response.data.id;
            this.storyTitle = response.data.title;
            this.$router.push({
              path: "/Search",
              name: "search",
              params: { id: this.storyId, title: this.storyTitle },
            });
          } else {
            this.$buefy.toast.open(response.data.message);
          }
        })
        .catch(function (error) {
          this.isLoading = false;
          console.log(error);
        });
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
