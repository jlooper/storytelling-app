<template>
	<main class="column is-four-fifths main is-pulled-right">
		<div class="box main-content">
			<h1 class="title">
				Build A Story for
				<span class="is-italic">{{ title }}</span>
			</h1>
			<hr />
		</div>

		<b-field grouped>
			<b-field label="Story Element">
				<b-select>
					<option>Narrative</option>
					<option>Provenance</option>
					<option>Tags</option>
				</b-select>
			</b-field>
			<b-field label="Text" expanded>
				<b-input></b-input>
			</b-field>
		</b-field>
		<b-field grouped>
			<b-field label="Story Element">
				<b-select>
					<option>Narrative</option>
					<option>Provenance</option>
					<option>Tags</option>
				</b-select>
			</b-field>
			<b-field label="Text" expanded>
				<b-input></b-input>
			</b-field>
		</b-field>
		<b-field grouped>
			<b-field label="Story Element">
				<b-select>
					<option>Narrative</option>
					<option>Provenance</option>
					<option>Tags</option>
				</b-select>
			</b-field>
			<b-field label="Text" expanded>
				<b-input></b-input>
			</b-field>
		</b-field>

		<div class="field is-grouped">
			<div class="control">
				<button class="button is-info">Build</button>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	name: 'Storybuilder',
	data() {
		return {
			title: '',
		};
	},
	created() {
		this.title = this.$route.params.title;
	},
};
</script>
