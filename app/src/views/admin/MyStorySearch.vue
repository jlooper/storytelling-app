<template>
  <main class="column is-four-fifths main is-pulled-right pb-100">
    <!--breadcrumbs-->
    <Breadcrumbs active="0" />
    <div class="columns">
      <div class="column is-three-quarters">
        <section class="box main-content">
          <h1 class="title has-text-info">{{ storyTitle }}</h1>
          <h2 class="title">Search for items to add to this story</h2>
          <b-loading
            :is-full-page="isFullPage"
            :active.sync="isLoading"
            :can-cancel="true"
          ></b-loading>
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

        <section>
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-5">
                  <span
                    @click="toggle('cards')"
                    class="p-4 mr-3 icon has-text-grey-dark"
                  >
                    <i class="fas fa-th"></i>
                  </span>
                  <span
                    @click="toggle('list')"
                    class="p-4 icon has-text-grey-dark"
                  >
                    <i class="fas fa-th-list"></i>
                  </span>
                </p>
              </div>
            </div>
          </nav>
          <!--<CooperHewitt />
					<VictoriaAndAlbert />-->
          <keep-alive>
            <component v-bind:is="component" />
          </keep-alive>
        </section>
      </div>

      <div class="column is-one-quarter m-5">
        <aside class="pt-3">
          <span class="navbar-item">
            <span>INVENTORY</span>
          </span>
          <div class="columns" v-for="item in currentStoryItems" :key="item.id">
            <div class="column is-full">
              <div class="card">
                <p class="card-header-title is-size-4">{{ item.title }}</p>

                <div class="card-image">
                  <figure class="image is-ratio">
                    <img :src="item.image" alt="Image" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
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
        </aside>
      </div>
    </div>
  </main>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import CooperHewittCards from "@/components/Museums/CooperHewittCards";
import CooperHewittList from "@/components/Museums/CooperHewittList";
//import VictoriaAndAlbertCards from '@/components/Museums/VictoriaAndAlbertCards';
//import VictoriaAndAlbertList from '@/components/Museums/VictoriaAndAlbertList';
import axios from "axios";

export default {
  components: {
    Breadcrumbs,
    CooperHewittCards,
    //VictoriaAndAlbertCards,
    CooperHewittList,
    //VictoriaAndAlbertList
  },
  props: {
    searchString: String,
  },
  data() {
    return {
      component: "CooperHewittCards",
      storyTitle: "",
      message: "",
      search_field: null,
      isLoading: false,
      isFullPage: false,
      storyId: "",
      currentStoryItems: [],
    };
  },
  methods: {
    submit() {
      this.$emit("search", this.search_field);
    },
    toggle(view) {
      console.log(view);
      if (view == "cards") {
        this.component = "CooperHewittCards";
      } else {
        this.component = "CooperHewittList";
      }
    },
  },
  created() {
    this.storyId = this.$route.params.id;
    this.storyTitle = this.$route.params.title;
    //todo move to vuex
    axios
      .post("/api/getAdminStoryItems", { id: this.$route.params.id })
      .then((response) => {
        if (response.status === 200) {
          this.currentStoryItems = response.data;
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

<style scoped>
.image img {
  width: auto;
  max-height: 200px;
}
</style>
