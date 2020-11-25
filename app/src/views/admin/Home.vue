<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="columns is-vcentered">
          <div class="column is-offset-1 is-centered home-elements">
            <h1 class="is-size-1 is-bold home-elements">Welcome!</h1>
            <h2 class="subtitle is-size-3 home-elements">Project Troubadour</h2>

            <div class="button-box">
              <b-button
                class="social-button twitter"
                @click="Auth('twitter')"
                size="is-medium"
                icon-left="twitter"
                >Login with Twitter</b-button
              >

              <b-button
                class="social-button facebook"
                @click="Auth('facebook')"
                size="is-medium"
                icon-left="facebook"
                >Login with Facebook</b-button
              >

              <b-button
                class="social-button google"
                @click="Auth('google')"
                size="is-medium"
                icon-left="google"
                >Login with Google</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import LayoutDefault from "@/layouts/LayoutDefault.vue";

export default {
  name: "app",

  methods: {
    Auth(provider) {
      const redirect = `post_login_redirect_uri=/admin/home`;
      const url = `/.auth/login/${provider}?${redirect}`;
      window.location.href = url;
    },
  },
  created() {
    this.$emit(`update:layout`, LayoutDefault);
  },
};
</script>

<style>
.button-box {
  margin-top: 10px;
}
.social-button {
  margin-right: 5px;
}
.twitter {
  color: white;
  background-color: #55acee;
}
.facebook {
  color: white;
  background-color: #3b5998;
}
.google {
  color: white;
  background-color: #34a853;
}
.card {
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  height: 100%;
  min-height: 400px;
}
.card-content {
  min-height: 150px;
}
.card-text,
.title {
  padding-top: 10px;
  text-align: center;
}
.media {
  border-top: 2px solid black;
  padding: 6px 0 15px;
  margin-bottom: 5px;
}
.wrapper {
  padding-bottom: 50px;
  padding-top: 1px;
}
</style>
