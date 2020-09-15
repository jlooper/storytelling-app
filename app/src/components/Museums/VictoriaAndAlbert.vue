<template>
  <section>
    <div>
      <div class="box card m-5" v-for="(object, index) in VAObjects" :key="index">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <!--<figure v-if="object.hasImage" class="image is-128x128" style="max-height: 100px">
								<img :src="object.webImage.url" :alt="object.title" />
              </figure>-->
              <p v-if="object.fields.title != ''" class="title is-4">{{ object.fields.title }}</p>
              <p v-if="object.fields.object != ''" class="subtitle is-6">{{ object.fields.object }}</p>
              <p
                v-if="object.fields.date_text != ''"
                class="subtitle is-6"
              >Date: {{ object.fields.date_text }}</p>
              <p
                v-if="object.fields.location != ''"
                class="subtitle is-6"
              >Location: {{ object.fields.location }}</p>
              <p
                v-if="object.fields.artist != ''"
                class="subtitle is-6"
              >Artist: {{ object.fields.artist }}</p>
              <p
                v-if="object.fields.place != ''"
                class="subtitle is-6"
              >Place: {{ object.fields.place }}</p>
            </div>
            <div class="media-content">
              <span class="tag is-dark mt-3">Victoria and Albert Collection</span>
            </div>
            <!--<div class="field is-grouped">
							<div class="control">
								<button class="button is-info" @click="addToStory(object)">Add to Story</button>
							</div>
            </div>-->
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
      VAObjects: [],
    };
  },
  methods: {
    async startSearch(value) {
      var vaconfig = {
        method: "get",
        url: "https://www.vam.ac.uk/api/json/museumobject/search",
        params: {
          q: value,
        },
      };
      try {
        const response = await axios(vaconfig);
        this.VAObjects = response.data.records;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.$parent.$on("search", this.startSearch);
  },
};
</script>

<style scoped>
.image img {
  width: auto;
  max-height: 200px;
}
</style>
