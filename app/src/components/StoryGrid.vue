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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stories: Array,
    admin: Boolean,
  },
  data() {
    return {
      isLoading: true,
      isFullPage: false,
    };
  },

  methods: {
    loadImage() {
      this.isLoading = false;
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

