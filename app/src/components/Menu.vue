<template>
  <div>
    <aside
      v-show="showMenu"
      class="column has-background-light is-one-fifth aside is-pulled-left"
    >
      <nav class="menu">
        <ul class="menu-list">
          <li>
            <router-link class="navbar-item" :to="'/admin/home'">
              <i class="fas fa-book"></i> My Stories
            </router-link>
          </li>
          <li v-show="showUsers">
            <span class="navbar-item">CONTRIBUTORS </span>
          </li>
          <li v-show="showUsers">
            <div class="">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://randomuser.me/api/portraits/men/75.jpg"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-left">
                      <p class="title is-4">John Smith</p>
                      <p class="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>

                  <div class="content">
                    I don't really love the palette of colors chosen here, let's
                    try for more blues
                    <hr />
                    <time datetime="2016-1-1">11:09 PM - 1 Jul 2020</time>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://randomuser.me/api/portraits/women/15.jpg"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-left">
                      <p class="title is-4">Ellen Ian</p>
                      <p class="subtitle is-6">@ellenian</p>
                    </div>
                  </div>

                  <div class="content">
                    I think this is a great start. Let's add more tweets
                    <hr />
                    <time datetime="2016-1-1">11:09 PM - 11 July 2020</time>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://randomuser.me/api/portraits/women/25.jpg"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-left">
                      <p class="title is-4">Ada Day</p>
                      <p class="subtitle is-6">@adaday</p>
                    </div>
                  </div>

                  <div class="content">
                    I think we're missing several pieces from the Frick; let me
                    investigate.
                    <hr />
                    <time datetime="2016-1-1">11:09 PM - 1 Aug 2020</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userId"]),
    showMenu() {
      if (this.userId == null) {
        return false;
      } else {
        return true;
      }
    },
    showUsers() {
      if (this.$route.params.id == null) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
