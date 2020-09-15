<template web>
  <main class="column is-four-fifths main is-pulled-right">
    <div class="box main-content">
      <h1 class="title is-size-3">Welcome!</h1>
      <div>
        <p>Below are your stories</p>
      </div>
      <router-link class="button is-large is-link" :to="'create'">Create a Story</router-link>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "profile",
  data() {
    return {
      //showMenu: true
    };
  },

  computed: {
    ...mapState(["userId"]),
  },

  methods: {
    fetchUserStories(userId) {
      console.log(userId);
    },
  },

  created() {
    this.fetchUserStories(this.userId);
  },
};
</script>
<style scoped>
.box {
  margin: 5px;
}
.card {
  background-color: transparent;
  box-shadow: none;
}
.card-content {
  padding: 1px;
}
.card-footer-item:not(:last-child) {
  border: none;
}
.card-footer {
  padding-top: 5px;
  margin: 5px;
}
h3 {
  padding-bottom: 20px;
}
</style>
