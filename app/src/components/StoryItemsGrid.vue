<template>
  <section>
    <div v-for="item in storyItems" :key="item.id" class="tile is-ancestor">
      <div class="tile is-vertical is-8 is-parent box ml-5 mb-5">
        <div v-if="item.type == 'tweet'" class="tile is-child">
          <p class="card-header-title is-size-4">
            <span class="pt-3 icon has-text-grey-light">
              <i class="fab fa-twitter fa-2x"></i>
            </span>
          </p>
          <hr />
          <span v-html="htmlDecode(item.content)"></span>
        </div>

        <div class="tile is-parent" v-else-if="item.type == 'video'">
          <div class="tile is-child">
            <span v-html="htmlDecode(item.content)"></span>
          </div>
        </div>

        <div class="tile is-parent" v-else-if="item.type == 'link'">
          <div class="tile is-child">
            <p class="is-size-4">
              <span class="pt-3 icon has-text-grey-light">
                <i class="fa fa-link fa-2x"></i>
              </span>
            </p>
            <hr />
            <span v-html="item.content"></span>
          </div>
        </div>

        <div class="tile is-parent" v-else-if="item.type == 'text'">
          <div class="tile is-child">
            <p class="is-size-4">
              <span class="pt-3 icon has-text-grey-light">
                <i class="fa fa-pen fa-2x"></i>
              </span>
            </p>
            <hr />
            <span v-html="item.content"></span>
          </div>
        </div>

        <div class="tile is-parent" v-else>
          <div class="tile is-child">
            <!--everything else-->
            <p class="is-size-4">{{ item.title }}</p>

            <div class="columns">
              <div class="column">
                <figure class="image is-ratio">
                  <img :src="item.image" alt="Image" />
                </figure>
              </div>
              <div class="column">
                <div class="content">
                  <p style="text-overflow: ellipsis">{{ item.description }}</p>
                  <p>{{ item.medium }}</p>
                  <p>{{ item.provenance }}</p>
                  <p>{{ item.artist }}</p>
                  <p>{{ item.date }}</p>
                  <p class="tag">{{ item.collection }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons mt-3" v-if="admin">
          <!--<a
            href="#"
            @click="goToStoryCustomizer(item.id, item.title)"
            class="button"
            >Edit</a
          >-->
          <a href="#" class="button" @click="deleteItem(item.id, item.title)"
            >Remove From Story</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: { storyItems: Array, admin: Boolean },
  methods: {
    htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    },
    deleteItem(id, title) {
      axios
        .post("/api/deleteStoryItem", { id: id, title: title })
        .then((response) => {
          this.$buefy.toast.open(response.data.message);
        })
        .catch((err) => {
          this.$buefy.toast.open(err);
        });
    },
    goToStoryCustomizer(id, title) {
      this.$router.push({
        path: "/admin/storycustomizer/",
        name: "storycustomizer",
        params: { id: id, title: title },
      });
    },
  },
};
</script>
