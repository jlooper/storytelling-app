<template>
	<div id="app">
		<Nav />
		<div class="wrapper">
			<Menu />
			<router-view />
		</div>

		<!--<Footer />-->
	</div>
</template>
<script>
import Nav from '@/components/Nav';
//import Footer from '@/components/Footer';
import Menu from '@/components/Menu';

export default {
	components: { Nav, /*Footer,*/ Menu },
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
.card {
	min-height: 400px;
}
$primary: #02a9ea;
$base: #fffeff;
$info: #ff01fb;
$warning: #faff00;
$link: #000300;
$card-shadow: 0 0.5em 1em -0.125em rgba($scheme-invert, 0.1), 0 0px 0 1px rgba($scheme-invert, 0.02) !default;
$colors: (
	'white': (
		$white,
		$black,
	),
	'black': (
		$black,
		$white,
	),
	'light': (
		$light,
		$light-invert,
	),
	'dark': (
		$dark,
		$dark-invert,
	),
	'primary': (
		$primary,
		$primary-invert,
	),
	'info': (
		$info,
		$info-invert,
	),
	'success': (
		$success,
		$success-invert,
	),
	'warning': (
		$warning,
		$warning-invert,
	),
	'danger': (
		$danger,
		$danger-invert,
	),
	'link': (
		$link,
		$link-invert,
	),
);

@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
