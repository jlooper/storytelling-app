<template>
  <div class="has-background-base">
    <aside v-show="showMenu" class="column is-one-fifth aside is-pulled-left">
      <nav class="menu">
        <ul class="menu-list">
          <li>
            <router-link class="navbar-item" :to="'/admin/stories'">
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
      console.log(this.userId);
      if (this.userId == null) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
