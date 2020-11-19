<template>
  <div class="LayoutDefault">
    <Nav />
    <div class="wrapper">
      <Menu />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Menu from "@/components/Menu";

export default {
  name: `LayoutDefault`,
  components: { Nav, Menu },
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

a {
  text-transform: uppercase;
}
.navbar-item {
  border-top: 2px solid;
  border-color: black;
}
aside {
  min-height: 100vh;
}

$family-sans-serif: "CooperHewitt", "sans-serif";
$primary: #000000;
$base: #ffffff;
$info: #3bd23d;
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
