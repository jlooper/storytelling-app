<template>
  <div>
    <aside v-show="showMenu" class="column has-background-light is-one-fifth aside is-pulled-left">
      <nav class="menu">
        <ul class="menu-list">
          <li>
            <router-link class="navbar-item" :to="'/admin/home'">
              <i class="fas fa-book"></i> My Stories
            </router-link>
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
  },
};
</script>
<style scoped>
aside {
  min-height: 100vh;
}
</style>