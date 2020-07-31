<template>
  <main class="column is-four-fifths main is-pulled-right">
    <div class="box main-content">
      <h1 class="title">Search</h1>
      <hr />
      <form @submit.prevent="submit">
        <div class="field">
          <label class="label">Item</label>
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
      <div class="box card m-5" v-for="(object, index) in MuseumObjects" :key="index">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-128x128" v-for="(o, index) in object.images" :key="index">
                <img v-if="index == 0" :src="o.b.url" :alt="object.title" />
              </figure>
            </div>
            <div class="media-content">
              <p>
                <a :href="object.url" target="_blank" class="title is-4">{{object.title}}</a>
              </p>
              <p v-if="object.medium" class="subtitle is-6">{{object.medium}}</p>
              <p v-if="object.label_text" class="subtitle is-6">{{object.label_text}}</p>
              <p
                v-if="object.accession_number"
                class="subtitle is-6"
              >Accession Number: {{object.accession_number}}</p>
              <p v-if="object.id" class="subtitle is-6">Object Id: {{object.id}}</p>
              <p v-if="object.creditline">{{object.creditline}}</p>
              <br />
              <time datetime="2016-1-1">Acquired {{object.year_acquired}}</time>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <router-link
                  class="button is-info"
                  :to="{ name: 'storybuilder', params: { id: object.id, title: object.title }}"
                >Tell a Story</router-link>
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
      MuseumObjects: [],
      submitStatus: null,
      isLoading: false,
      message: "",
      validClass: "input",
      search_field: null,
    };
  },
  methods: {
    submit() {
      this.MuseumObjects = [];
      this.$v.$touch();
      if (this.search_field == null) {
        this.submitStatus = "ERROR";
        this.validClass = "input is-danger";
      } else {
        this.submitStatus = "PENDING";
        this.validClass = "input";
        //start search
        var config = {
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

        axios(config)
          .then((response) => {
            console.log(response);
            this.MuseumObjects = response.data.objects;
          })
          .catch(function (error) {
            console.log(error);
          });

        setTimeout(() => {
          this.submitStatus = "OK";
          this.validClass = "input";
        }, 500);
      }
    },
  },
};
</script>
