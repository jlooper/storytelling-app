<template>
	<main class="column is-four-fifths main is-pulled-right">
		<div class="box main-content">
			<h1 class="title">Search</h1>
			<hr />
			<form @submit.prevent="submit">
				<div class="field">
					<label class="label">Item</label>
					<div class="control">
						<input class="input" type="text" placeholder="Text input" />
					</div>
				</div>

				<div class="field is-grouped">
					<div class="control">
						<button class="button is-link">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>
