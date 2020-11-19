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
          <nav v-if="isSearching" class="level">
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
          <keep-alive>
            <component v-bind:is="component" />
          </keep-alive>
        </section>
      </div>

      <div class="column is-one-third">
        <aside class="pt-3">
          <span class="navbar-item">
            <span>INVENTORY</span>
          </span>
          <StoryItemsGrid
            v-bind:storyItems="currentStoryItems"
            v-bind:admin="false"
          />
        </aside>
      </div>
    </div>
  </main>
</template>
<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import CombinedMuseumCards from "@/components/Museums/CombinedMuseumCards";
import CombinedMuseumList from "@/components/Museums/CombinedMuseumList";
import StoryItemsGrid from "@/components/StoryItemsGrid";
import LayoutDefault from "@/layouts/LayoutDefault.vue";

import axios from "axios";

export default {
  components: {
    Breadcrumbs,
    CombinedMuseumCards,
    StoryItemsGrid,
    CombinedMuseumList,
  },
  props: {
    searchString: String,
  },
  data() {
    return {
      isSearching: false,
      component: "CombinedMuseumCards",
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
      this.isSearching = true;
      this.$emit("search", this.search_field);
    },
    toggle(view) {
      if (view == "cards") {
        this.component = "CombinedMuseumCards";
      } else {
        this.component = "CombinedMuseumList";
      }
    },
  },
  created() {
    this.$emit(`update:layout`, LayoutDefault);

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
