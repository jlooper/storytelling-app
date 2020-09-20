<template>
  <div>
    <h1 class="title">Story Elements</h1>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-info" @click="addToStory()">Add Items to Story</button>
      </div>
    </div>
    <div class="columns is-multiline">
      <hr />

      <!--<draggable
        v-model="storyItems"
        group="items"
        @start="drag = true"
        @end="drag = false"
        class="card column is-one-quarter"
        v-for="item in storyItems"
        :key="item.id"
      >-->
      <div class="card column is-one-quarter" v-for="item in storyItems" :key="item.id">
        <header class="card-header">
          <p class="card-header-title is-size-4">{{ item.items.title }}</p>
        </header>
        <div class="card-image">
          <figure class="image" v-for="(o, index) in item.items.images" :key="index">
            <img v-if="index == 0" :src="o.b.url" :alt="item.items.title" />
          </figure>
        </div>
        <div class="card-content">
          <div>
            <p>{{ item.items.description }}</p>
            <p>{{ item.items.medium }}</p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Edit</a>
          <a
            href="#"
            class="card-footer-item"
            @click="deleteItem(item.id,item.items.title)"
          >Remove From Story</a>
        </footer>
      </div>

      <!--<mindmap class="column" :nodes="nodes" :connections="connections" :editable="true" />-->
    </div>
  </div>
</template>
<script>
//import draggable from "vuedraggable";
import axios from "axios";
//import map from '@/assets/map';
export default {
  components: {
    //draggable,
  },
  data() {
    return {
      storyItems: [],
      nodes: [],
      connections: [],
      editable: true,
      //...map,
    };
  },
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
  created() {
    axios
      .post("/api/getStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.storyItems = response.data;
          console.log(this.nodes);
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
