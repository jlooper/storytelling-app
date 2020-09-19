<template>
  <div id="app" class="is-family-sans-serif">
    <Nav />
    <div class="wrapper">
      <Menu />
      <router-view />
    </div>

    <!--<Footer />-->
  </div>
</template>
<script>
import Nav from "@/components/Nav";
//import Footer from '@/components/Footer';
import Menu from "@/components/Menu";

export default {
  components: { Nav, /*Footer,*/ Menu },
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@font-face {
  font-family: "CooperHewitt";
  src: url("/fonts/CooperHewitt-Medium.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
.card {
  min-height: 400px;
}
a {
  text-transform: uppercase;
}
.navbar-item {
  border-top: 2px solid;
  border-color: black;
}
$family-sans-serif: "CooperHewitt", "sans-serif";
$primary: #000000;
$base: #ffffff;
$info: #ff47af;
$warning: #faff00;
$link: #ff6c2f;
$card-shadow: 0 0.5em 1em -0.125em rgba($scheme-invert, 0.1),
  0 0px 0 1px rgba($scheme-invert, 0.02) !default;
$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
  "link": (
    $link,
    $link-invert,
  ),
);

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
