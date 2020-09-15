<template>
  <main class="column is-four-fifths main is-pulled-right pb-100">
    <Steps activeStep="2" />
    <section class="box main-content">
      <h1 class="title has-text-info">{{ storyTitle }}</h1>
      <h2 class="title">Search for items to add to this story</h2>
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <hr />
      <form @submit.prevent="submit">
        <b-field label="Search">
          <b-input
            v-model.trim="search_field"
            required
            validation-message="Search field is required"
            type="text"
          ></b-input>
        </b-field>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Search</button>
          </div>
        </div>
      </form>
    </section>
    <section class="is-pulled-right mb-20">
      <button @click="goToStoryCustomizer()" class="button is-link">Continue</button>
    </section>

    <section>
      <hr />
      <p class="is-size-4 has-text-left has-text-link">Story box</p>

      <draggable class="drop-box" v-model="myStories"></draggable>
      <p class="is-size-4 has-text-left has-text-link">Drag cards to story box to create your story</p>
    </section>
    <CooperHewitt />
    <VictoriaAndAlbert />
  </main>
</template>
<script>
//var axios = require("axios");
import Steps from "@/components/Steps";
import CooperHewitt from "@/components/Museums/CooperHewitt";
import VictoriaAndAlbert from "@/components/Museums/VictoriaAndAlbert";

import draggable from "vuedraggable";
export default {
  components: {
    Steps,
    draggable,
    CooperHewitt,
    VictoriaAndAlbert,
  },
  props: {
    searchString: String,
  },
  data() {
    return {
      storyTitle: "",
      message: "",
      search_field: null,
      isLoading: false,
      isFullPage: false,
      myStories: [],
      storyId: "",
    };
  },
  methods: {
    submit() {
      this.$emit("search", this.search_field);
    },

    /*createStoryItem(object) {
      axios
        .post("/api/createStoryItem", {
          storyId: this.$route.params.id,
          item: object,
        })

        .then((response) => {
          if (response.data.errorMessage == null) {
            this.$buefy.toast.open(response.data.message);
          } else {
            this.$buefy.toast.open(response.data.errorMessage);
          }
        })
        .catch(function (error) {
          this.$buefy.toast.open(error);
        });
    },*/
    goToStoryCustomizer() {
      this.$router.push({
        path: "/StoryCustomizer",
        name: "storycustomizer",
        params: { id: this.$route.params.id, title: this.storyTitle },
      });
    },
  },
  created() {
    this.storyId = this.$route.params.id;
    this.storyTitle = this.$route.params.title;
  },
};
</script>

<style scoped>
.image img {
  width: auto;
  max-height: 200px;
}
.drop-box {
  height: 200px;
  margin: 10px;
  background-color: #eee;
  border-radius: 5px;
}
</style>
