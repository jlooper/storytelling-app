<template>
	<main class="column is-four-fifths main is-pulled-right">
		<Steps activeStep="3" />
		<div class="box main-content">
			<h1 class="title">
				Customize your Story Item:
				<span class="is-italic">{{ title }}</span>
				<div>
					<span v-for="k in suggestedTags[0].keyphrases" :key="k" class="tag is-primary">{{ k }}</span>
				</div>
			</h1>
			<hr />
		</div>

		<!--<b-field grouped>
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
		</div>-->
	</main>
</template>

<script>
import Steps from '@/components/Steps';
import axios from 'axios';

export default {
	name: 'Storybuilder',
	components: {
		Steps,
	},
	data() {
		return {
			isLoading: false,
			isFullPage: false,
			title: '',
			suggestedTags: [],
		};
	},
	created() {
		this.title = this.$route.params.title;
		this.id = this.$route.params.id;
		axios
			.get(
				'https://cooperhewitt-search.search.windows.net/indexes/cosmosdb-index4/docs?api-version=2020-06-30&search=*&%24filter=id%20eq%20%27' +
					this.id +
					'%27&api-key=03A778C275617F4E554EC2FB6327B69D'
			)
			.then((response) => {
				if (response.status === 200) {
					this.suggestedTags = response.data.value;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
</script>
<style scoped>
.tag:not(body) {
	margin: 3px;
}
</style>
