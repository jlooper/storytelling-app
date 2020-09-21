<template>
  <main class="column is-four-fifths main is-pulled-right">
    <h1 class="title">Stories</h1>
    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
    <div class="main-content columns is-multiline">
      <hr />
      <div class="card column is-one-quarter" v-for="story in stories" :key="story.id">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="buildImageUrl(story.imageUrl)" :alt="story.title" />
          </figure>
        </div>
        <!--<b-skeleton height="300px" :active="!loaded" :count="1"></b-skeleton>-->
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <router-link :to="{ path: '/story/' + story.id + '' }" class="title is-5">
                {{
                story.title
                }}
              </router-link>
            </div>
          </div>
        </div>
        <!--<b-skeleton size="is-large" :active="!loaded" :count="3"></b-skeleton>-->
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      stories: [],
      isLoading: false,
      isFullPage: true,
    };
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
    this.isLoading = true;
    axios
      .get("/api/getStories")
      .then((response) => {
        this.isLoading = false;
        if (response.status === 200) {
          this.stories = response.data;
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
