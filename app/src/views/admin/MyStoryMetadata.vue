<template>
  <main class="column is-four-fifths main is-pulled-right pb-100">
    <Steps activeStep="3" />
    <div class="columns">
      <div class="column is-three-quarters">
        <section class="box main-content">
          <h1 class="title">Add Metadata to this Story</h1>
          <b-loading
            :is-full-page="isFullPage"
            :active.sync="isLoading"
            :can-cancel="true"
          ></b-loading>
          <hr />
          <form @submit.prevent="submit">
            <span
              ><b-field label="Text">
                <textarea
                  v-model.trim="text_field"
                  required
                  class="textarea"
                  placeholder="e.g. Hello world"
                ></textarea>
              </b-field>
            </span>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Add</button>
              </div>
            </div>
          </form>
        </section>
      </div>

      <div class="column is-one-quarter m-5">
        <aside class="pt-3">
          <span class="navbar-item">
            <span>CONTENT TYPES</span>
          </span>
          <div class="box">
            <div class="columns">
              <div class="column has-text-centered element">
                <span class="pt-3 icon has-text-grey-light">
                  <i class="fas fa-file-text fa-3x"></i>
                </span>
                <p class="pt-3">Text</p>
              </div>
              <div class="column has-text-centered element">
                <span class="pt-3 icon has-text-grey-light">
                  <i class="fas fa-file-image fa-3x"></i>
                </span>
                <p class="pt-3">Image</p>
              </div>
              <div class="column has-text-centered element">
                <span class="pt-3 icon has-text-grey-light">
                  <i class="fab fa-twitter fa-3x"></i>
                </span>
                <p class="pt-3">Tweet</p>
              </div>
            </div>

            <div class="columns">
              <div class="column has-text-centered element">
                <span class="pt-3 icon has-text-grey-light">
                  <i class="fas fa-video fa-3x"></i>
                </span>
                <p class="pt-3">Video</p>
              </div>
              <div class="column has-text-centered element">
                <span class="pt-3 icon has-text-grey-light">
                  <i class="fas fa-link fa-3x"></i>
                </span>
                <p class="pt-3">Link</p>
              </div>
              <div class="column has-text-centered element">
                <span class="pt-3 icon has-text-grey-light">
                  <i class="fas fa-share fa-3x"></i>
                </span>
                <p class="pt-3">Share</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script>
import Steps from "@/components/Steps";
import axios from "axios";

export default {
  components: {
    Steps,
  },
  props: {},
  data() {
    return {
      storyTitle: "",
      message: "",
      isLoading: false,
      isFullPage: false,
      storyId: "",
    };
  },
  methods: {
    submit() {},
  },
  created() {
    this.storyId = this.$route.params.id;
    //this.storyTitle = this.$route.params.title;
    //todo move to vuex
    axios
      .post("/api/getStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.currentStoryItems = response.data;
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

<style scoped>
.element {
  border: solid 1px black;
  border-radius: 2px;
  margin: 4px;
}
.icon {
  margin: 4px;
}
</style>