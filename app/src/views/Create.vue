<template>
  <main class="column is-four-fifths main is-pulled-right">
    <!--breadcrumbs-->
    <Steps activeStep="1" />
    <div class="box main-content">
      <h1 class="title">Tell a Story</h1>
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <hr />
      <form @submit.prevent="submit">
        <div class="field">
          <label class="label">Story Title</label>
          <div class="control">
            <input :class="validClass" v-model.trim="$v.title_field.$model" type="text" />
          </div>
        </div>

        <section>
          <b-field>
            <b-upload v-model="dropFiles" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>

          <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
              {{ file.name }}
              <button
                class="delete is-small"
                type="button"
                @click="deleteDropFile(index)"
              ></button>
            </span>
          </div>
        </section>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>
    <div class="field is-grouped is-pulled-right">
      <button type="button" @click="upload()">Upload</button>

      <div class="control">
        <button @click="goToStoryBuilder()" :disabled="!proceed" class="button is-info">Continue</button>
      </div>
    </div>
  </main>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Steps from "@/components/Steps";

import axios from "axios";

export default {
  validations: {
    title_field: {
      required,
    },
  },
  components: {
    Steps,
  },

  data() {
    return {
      dropFiles: [],
      proceed: false,
      isLoading: false,
      isFullPage: false,
      submitStatus: null,
      validClass: "input",
      title_field: null,
      storyId: null,
      storyTitle: null,
      loadingComponent: null,

      image: null,
      uploading: false,
      uploadError: false,
      imageInfo: null,
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },

    upload() {
      let file = this.dropFiles;
      console.log(file);
      if (file) {
        this.imageInfo = null;
        this.uploading = true;
        this.uploadError = false;
        axios
          .put("/api/uploadStoryImageSDK", file)
          .then((response) => {
            if (response.status === 200) {
              console.log("Image uploaded successfully");
              this.uploading = false;
              this.imageInfo = JSON.parse(response.data);
            } else {
              this.uploadError = true;
            }
          })
          .catch((err) => {
            this.uploading = false;
            this.uploadError = true;
            console.error(err);
          });
      }
    },

    submit() {
      this.isLoading = true;
      this.$v.$touch();
      if (this.title_field == null) {
        this.submitStatus = "ERROR";
        this.validClass = "input is-danger";
      } else {
        this.submitStatus = "PENDING";
        this.validClass = "input";
        //submit title of story
        axios
          .post("/api/createStory", {
            title: this.title_field,
          })
          .then((response) => {
            this.isLoading = false;
            if (response.data.errorMessage == null) {
              this.$buefy.toast.open(response.data.message);

              this.proceed = !this.proceed;
              //todo - vuex
              this.storyId = response.data.id;
              this.storyTitle = response.data.title;
            } else {
              this.$buefy.toast.open(response.data.message);
            }
          })
          .catch(function (error) {
            this.isLoading = false;
            console.log(error);
          });
      }
    },
    goToStoryBuilder() {
      this.$router.push({
        path: "/Search",
        name: "search",
        params: { id: this.storyId, title: this.storyTitle },
      });
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 20px;
}
</style>
