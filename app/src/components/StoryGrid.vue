<template>
  <div>
    <div class="main-content columns is-multiline">
      <hr />
      <div
        class="card column is-one-quarter"
        v-for="story in stories"
        :key="story.id"
      >
        <div class="card-image">
          <figure class="image is-4by3">
            <b-loading
              :is-full-page="isFullPage"
              v-model="isLoading"
              :can-cancel="true"
            >
            </b-loading>
            <img
              :src="buildImageUrl(story.imageUrl)"
              @load="loadImage"
              :alt="story.title"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content" v-if="!admin">
              <router-link
                :to="{ path: '/story/' + story.id + '' }"
                class="title is-5"
                >{{ story.title }}</router-link
              >
            </div>
            <div class="media-content" v-else>
              <router-link
                :to="{ path: '/admin/story/' + story.id + '' }"
                class="title is-5"
                >{{ story.title }}</router-link
              >
            </div>
          </div>
        </div>

        <footer class="card-footer" v-if="admin">
          <b-button
            v-if="!story.published"
            class="card-footer-item"
            @click="publish(true, story)"
            >Publish</b-button
          >

          <b-button
            v-else
            class="card-footer-item"
            @click="publish(false, story)"
            >Unpublish</b-button
          >

          <router-link
            :to="{ path: '/admin/story/' + story.id + '' }"
            class="button is-capitalized card-footer-item"
            >Edit</router-link
          >
          <b-button
            class="card-footer-item"
            @click="deleteStory(story.id, story.title)"
            >Delete</b-button
          >
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    stories: Array,
    admin: Boolean,
  },
  data() {
    return {
      isLoading: true,
      isFullPage: false,
      isSwitched: false,
    };
  },

  methods: {
    loadImage() {
      this.isLoading = false;
    },
    publish(status, story) {
      axios
        .put("/api/updateStory", { story: story, publish: status })
        .then((response) => {
          console.log(response);
          this.$buefy.toast.open("You have successfully edited a story");
        })
        .catch((err) => {
          this.$buefy.toast.open(err);
        });
    },
    deleteStory(id, title) {
      axios
        .post("/api/deleteStory", { id: id, title: title })
        .then((response) => {
          //todo, add a function to get rid of all story items
          this.$buefy.toast.open(response.data.message);
        })
        .catch((err) => {
          this.$buefy.toast.open(err);
        });
    },
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
};
</script>

