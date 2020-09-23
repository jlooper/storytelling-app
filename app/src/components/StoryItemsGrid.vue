<template>
  <section>
    <div class="columns container" v-if="admin">
      <div class="column">
        <button class="button is-info" @click="addToStory()">Add Items to Story</button>
      </div>
    </div>
    <div class="columns is-multiline">
      <hr />
      <div class="card column is-one-quarter" v-for="item in storyItems" :key="item.id">
        <header class="card-header">
          <p class="card-header-title is-size-4">{{ item.title }}</p>
        </header>
        <div class="card-image">
          <figure class="image">
            <img :src="item.image" :alt="item.title" />
          </figure>
        </div>
        <div class="card-content">
          <div>
            <p>{{ item.description }}</p>
            <p>{{ item.medium }}</p>
            <p>{{ item.provenance }}</p>
            <p>{{ item.artist }}</p>
            <p>{{ item.date }}</p>
          </div>
        </div>
        <footer v-if="admin" class="card-footer">
          <a href="#" class="card-footer-item">Edit</a>
          <a
            href="#"
            class="card-footer-item"
            @click="deleteItem(item.id, item.title)"
          >Remove From Story</a>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: { storyItems: Array, admin: Boolean },
  methods: {
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
    addToStory() {
      this.$router.push({
        path: "/admin/search",
        name: "search",
        params: { id: this.$route.params.id },
      });
    },
  },
};
</script>
