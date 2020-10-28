<template>
  <section>
    <div
      class="box card m-5"
      v-for="(object, index) in CooperHewittMuseumObjects"
      :key="index"
    >
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure
              class="image is-128x128"
              v-for="(o, index) in object.images"
              :key="index"
            >
              <img v-if="index == 0" :src="o.b.url" :alt="object.title" />
            </figure>
          </div>
          <div class="media-content">
            <p>
              <a :href="object.url != ''" target="_blank" class="title is-4">{{
                object.title
              }}</a>
            </p>
            <p v-if="object.medium != ''" class="subtitle is-6">
              {{ object.medium }}
            </p>
            <p v-if="object.label_text != ''" class="subtitle is-6">
              {{ object.label_text }}
            </p>
            <p v-if="object.accession_number != ''" class="subtitle is-6">
              Accession Number: {{ object.accession_number }}
            </p>
            <p v-if="object.id" class="subtitle is-6">
              Object Id: {{ object.id }}
            </p>
            <p v-if="object.creditline != ''">{{ object.creditline }}</p>
            <br />
            <time datetime="2016-1-1">Acquired {{ object.year_acquired }}</time>
            <br />
            <p class="tag is-primary mt-3">Cooper Hewitt Museum Collection</p>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-info" @click="createStoryItem(object)">
                Add to Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
var axios = require("axios");

export default {
  data() {
    return {
      CooperHewittMuseumObjects: [],
    };
  },

  methods: {
    async startSearch(value) {
      var chconfig = {
        method: "get",
        url:
          "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects",
        headers: {},
        params: {
          access_token: "5a3c42c653014805fd1e06902631596f",
          query: value,
          page: 1,
          per_page: 10,
        },
      };
      try {
        const response = await axios(chconfig);
        this.CooperHewittMuseumObjects = response.data.objects;
      } catch (error) {
        console.error(error);
      }
    },
    createStoryItem(object) {
      axios
        .post("/api/createStoryItem", {
          storyId: this.$route.params.id,
          image: object.images[0].b.url,
          title: object.title,
          label: object.label_text,
          description: object.description,
          type: object.type,
          medium: object.medium,
          url: object.url,
          date: object.date,
          acquired: object.year_acquired,
          collection: "Cooper Hewitt",
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
    },
  },
  created() {
    this.$parent.$parent.$on("search", this.startSearch);
  },
};
</script>

<style scoped>
.image img {
  width: auto;
  max-height: 200px;
}
</style>
