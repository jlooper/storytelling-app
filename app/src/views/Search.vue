<template>
  <main class="column is-four-fifths main is-pulled-right">
    <section>
      <b-steps
        v-model="activeStep"
        :animated="isAnimated"
        :rounded="isRounded"
        :has-navigation="hasNavigation"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        :label-position="labelPosition"
        :mobile-mode="mobileMode"
      >
        <b-step-item step="1" label="Create A Story" :clickable="isStepsClickable"></b-step-item>

        <b-step-item
          step="2"
          label="Select Items for Story"
          :clickable="isStepsClickable"
          :type="{ 'is-success': isProfileSuccess }"
        ></b-step-item>

        <b-step-item
          :step="showSocial ? '4' : '3'"
          label="Manage Layout"
          :clickable="isStepsClickable"
          disabled
        ></b-step-item>
      </b-steps>
    </section>
    <div class="box main-content">
      <h1 class="title">Search for items to add to your story</h1>
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
      <hr />
      <form @submit.prevent="submit">
        <div class="field">
          <label class="label">Objects</label>
          <div class="control">
            <input :class="validClass" v-model.trim="$v.search_field.$model" type="text" />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>

    <div>
      <div class="box card m-5" v-for="(object, index) in CooperHewittMuseumObjects" :key="index">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128" v-for="(o, index) in object.images" :key="index">
                <img v-if="index == 0" :src="o.b.url" :alt="object.title" />
              </figure>
            </div>
            <div class="media-content">
              <p>
                <a :href="object.url != ''" target="_blank" class="title is-4">{{ object.title }}</a>
              </p>
              <p v-if="object.medium != ''" class="subtitle is-6">{{ object.medium }}</p>
              <p v-if="object.label_text != ''" class="subtitle is-6">{{ object.label_text }}</p>
              <p
                v-if="object.accession_number != ''"
                class="subtitle is-6"
              >Accession Number: {{ object.accession_number }}</p>
              <p v-if="object.id" class="subtitle is-6">Object Id: {{ object.id }}</p>
              <p v-if="object.creditline != ''">{{ object.creditline }}</p>
              <br />
              <time datetime="2016-1-1">Acquired {{ object.year_acquired }}</time>
              <br />
              <p class="tag is-primary mt-3">Cooper Hewitt Museum Collection</p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <!--<router-link
                  class="button is-info"
                  :to="{ name: 'storybuilder', params: { storyId: this.storyId, id: object.id, title: object.title } }"
                >Add to Story</router-link>-->
                <button class="button is-info" @click="addToStory(object)">Add to Story</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Rijks-->
    <hr />
    <div>
      <div class="box card m-5" v-for="(object, index) in RijksMuseumObjects" :key="index">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure v-if="object.hasImage" class="image is-128x128" style="max-height: 100px">
                <img :src="object.webImage.url" :alt="object.title" />
              </figure>
            </div>
            <div class="media-content">
              <p>
                <a
                  :href="object.links.web != ''"
                  target="_blank"
                  class="title is-4"
                >{{ object.title }}</a>
              </p>
              <p>Principal or First Maker: {{object.principalOrFirstMaker}}</p>
              <p v-for="p in object.productionPlaces" :key="p.id">{{p}}</p>
              <span class="tag is-dark mt-3">Rijksmuseum Collection</span>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <!--<router-link
                  class="button is-info"
                  :to="{ name: 'storybuilder', params: { storyId: this.storyId, id: object.id, title: object.title } }"
                >Add to Story</router-link>-->
                <button class="button is-info" @click="addToStory(object)">Add to Story</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
var axios = require("axios");
import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    search_field: {
      required,
    },
  },
  data() {
    return {
      CooperHewittMuseumObjects: [],
      RijksMuseumObjects: [],
      submitStatus: null,
      message: "",
      validClass: "input",
      search_field: null,
      isLoading: false,
      isFullPage: false,

      activeStep: 1,
      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,
      hasNavigation: false,
      customNavigation: false,
      isProfileSuccess: false,
      labelPosition: "bottom",
      mobileMode: "minimalist",
      prevIcon: "",
      nextIcon: "",
      storyId: "",
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      this.CooperHewittMuseumObjects = [];
      this.RijksMuseumObjects = [];
      this.$v.$touch();
      if (this.search_field == null) {
        this.submitStatus = "ERROR";
        this.validClass = "input is-danger";
      } else {
        this.submitStatus = "PENDING";
        this.validClass = "input";
        //start search
        var chconfig = {
          method: "get",
          url:
            "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects",
          headers: {},
          params: {
            access_token: "5a3c42c653014805fd1e06902631596f",
            query: this.search_field,
            page: 1,
            per_page: 10,
          },
        };

        var rijksconfig = {
          method: "get",
          url: "https://www.rijksmuseum.nl/api/nl/collection?key=PqVYN24g",
          params: {
            q: this.search_field,
            p: 1,
            ps: 10,
            st: "Objects",
          },
        };

        const firstrequest = axios(chconfig).then((response) => {
          this.CooperHewittMuseumObjects = response.data.objects;
        });

        const secondrequest = axios(rijksconfig).then((response) => {
          this.RijksMuseumObjects = response.data.artObjects;
        });

        axios
          .all([axios(firstrequest), axios(secondrequest)])
          .then((this.isLoading = false))
          .catch((error) => console.log(error));
        setTimeout(() => {
          this.submitStatus = "OK";
          this.validClass = "input";
        }, 500);
      }
    },
    addToStory(object) {
      console.log(object);
      axios
        .post("/api/stories/add", {
          id: object.id,
          storyId: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          if (response.data.errorMessage == null) {
            this.message = response.data.message;
          } else {
            this.message = response.data.errorMessage;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.image img {
  width: auto;
  max-height: 200px;
}
</style>
