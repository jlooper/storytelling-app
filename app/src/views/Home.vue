<template>
	<div>
		<section class="hero">
			<div class="hero-body">
				<div class="columns is-vcentered">
					<div class="column is-half is-offset-1 is-centered home-elements">
						<h1 class="is-size-1 is-bold home-elements">Welcome!</h1>
						<h2 class="subtitle is-size-3 home-elements">The Storytelling App</h2>

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

					<div class="column is-half is-centered">
						<img src="../assets/home.png" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	name: 'app',
	methods: {
		Auth(provider) {
			const redirect = `post_login_redirect_uri=/home`;
			const url = `/.auth/login/${provider}?${redirect}`;
			window.location.href = url;
		},
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
}

.card-text,
.title {
	padding-top: 10px;
	text-align: center;
}
.content-wrapper {
	padding-bottom: 50px;
}
</style>
