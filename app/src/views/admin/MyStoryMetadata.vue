<template>
	<main class="column is-four-fifths main is-pulled-right pb-100">
		<Steps activeStep="3" />
		<div class="columns">
			<div class="column is-three-quarters">
				<section class="box main-content">
					<h1 class="title">Add Metadata to this Story</h1>
					<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
					<hr />
					<div class="list" v-for="(widget, index) in widgets" :key="index">
						<div class="hidden" v-show="widget.visible && widget.element == 'text'">
							<form @submit.prevent="submit(widget.element)">
								<vue-editor v-model="textContent" :editorToolbar="textToolbar"></vue-editor>
								<div class="field is-grouped">
									<div class="control mt-5">
										<button class="button is-link">Submit</button>
									</div>
								</div>
							</form>
							<hr />
						</div>
						<!--embed a tweet-->
						<div class="hidden" v-show="widget.visible && widget.element == 'tweet'">
							<form @submit.prevent="submit(widget.element)">
								<vue-editor v-model="tweetContent" :editorToolbar="codeToolbar"></vue-editor>
								<div class="field is-grouped">
									<div class="control mt-5">
										<button class="button is-link">Submit</button>
									</div>
								</div>
							</form>
							<hr />
						</div>
						<!--add a YouTube embed-->
						<div class="hidden" v-show="widget.visible && widget.element == 'video'">
							<form @submit.prevent="submit(widget.element)">
								<vue-editor v-model="videoContent" :editorToolbar="codeToolbar"></vue-editor>
								<div class="field is-grouped">
									<div class="control mt-5">
										<button class="button is-link">Submit</button>
									</div>
								</div>
							</form>
							<hr />
						</div>
						<!--add an image-->
						<div class="hidden" v-show="widget.visible && widget.element == 'image'">
							<form @submit.prevent="submit(widget.element)">
								<vue-editor v-model="imageContent" :editorToolbar="imageToolbar"></vue-editor>
								<div class="field is-grouped">
									<div class="control mt-5">
										<button class="button is-link">Submit</button>
									</div>
								</div>
							</form>
							<hr />
						</div>
						<!--add an image-->
						<div class="hidden" v-show="widget.visible && widget.element == 'link'">
							<form @submit.prevent="submit(widget.element)">
								<vue-editor v-model="linkContent" :editorToolbar="linkToolbar"></vue-editor>
								<div class="field is-grouped">
									<div class="control mt-5">
										<button class="button is-link">Submit</button>
									</div>
								</div>
							</form>
							<hr />
						</div>
					</div>
				</section>
			</div>

			<div class="column is-one-quarter m-5">
				<aside class="pt-3">
					<span class="navbar-item">
						<span>CONTENT TYPES</span>
					</span>

					<div class="box">
						<div class="columns">
							<div @click="toggle(0)" class="column has-text-centered element">
								<span class="pt-3 icon has-text-grey-light">
									<i class="fas fa-file-text fa-3x"></i>
								</span>
								<p class="pt-3">Text</p>
							</div>
							<div @click="toggle(1)" class="column has-text-centered element">
								<span class="pt-3 icon has-text-grey-light">
									<i class="fas fa-file-image fa-3x"></i>
								</span>
								<p class="pt-3">Image</p>
							</div>
							<div @click="toggle(2)" class="column has-text-centered element">
								<span class="pt-3 icon has-text-grey-light">
									<i class="fab fa-twitter fa-3x"></i>
								</span>
								<p class="pt-3">Tweet</p>
							</div>
						</div>

						<div class="columns">
							<div @click="toggle(3)" class="column has-text-centered element">
								<span class="pt-3 icon has-text-grey-light">
									<i class="fas fa-video fa-3x"></i>
								</span>
								<p class="pt-3">Video</p>
							</div>
							<div @click="toggle(4)" class="column has-text-centered element">
								<span class="pt-3 icon has-text-grey-light">
									<i class="fas fa-link fa-3x"></i>
								</span>
								<p class="pt-3">Link</p>
							</div>
							<div @click="toggle(5)" class="column has-text-centered element">
								<span class="pt-3 icon has-text-grey-light">
									<i class="fas fa-share fa-3x"></i>
								</span>
								<p class="pt-3">Share</p>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</div>
	</main>
</template>

<script>
import Steps from '@/components/Steps';
import axios from 'axios';
import { VueEditor } from 'vue2-editor';

export default {
	components: {
		Steps,
		VueEditor,
	},
	name: 'metadata',

	data() {
		return {
			textContent: '<h2>Add a formatted blogpost</h2><p>Your text here</p>',
			tweetContent: 'Your Twitter embed code here',
			videoContent: 'Your Youtube embed code here',
			imageContent: '',
			linkContent: 'Add a link',
			textToolbar: [
				[
					{
						header: [false, 1, 2, 3, 4, 5, 6],
					},
				],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'bullet' }],
			],
			imageToolbar: [['image']],
			codeToolbar: [['code']],
			linkToolbar: [['link']],
			storyTitle: '',

			message: '',
			isLoading: false,
			isFullPage: false,
			storyId: '',
			visible: true,
			widgets: [
				{
					element: 'text',
					visible: false,
				},
				{
					element: 'image',
					visible: false,
				},
				{
					element: 'tweet',
					visible: false,
				},
				{
					element: 'video',
					visible: false,
				},
				{
					element: 'link',
					visible: false,
				},
				{
					element: 'share',
					visible: false,
				},
			],
		};
	},
	methods: {
		clear() {
			(this.textContent = '<h2>Add a formatted blogpost</h2><p>Your text here</p>'),
				(this.tweetContent = 'Your Twitter embed code here'),
				(this.videoContent = 'Your Youtube embed code here'),
				(this.imageContent = ''),
				(this.linkContent = 'Add a link');
		},
		submit(el) {
			switch (el) {
				case 'text':
					this.content = this.textContent;
					break;
				case 'tweet':
					this.content = this.tweetContent;
					break;
				case 'image':
					this.content = this.imageContent;
					break;
				case 'link':
					this.content = this.linkContent;
					break;
				case 'video':
					this.content = this.videoContent;
					break;

				default:
					this.content = this.textContent;
			}
			axios
				.post('/api/createStoryItem', {
					storyId: this.$route.params.id,
					type: el,
					content: this.content,
				})

				.then((response) => {
					//clear all
					this.clear();

					if (response.data.errorMessage == null) {
						this.$buefy.toast.open(response.data.message);
					} else {
						this.$buefy.toast.open(response.data.errorMessage);
					}
				})
				.catch(function(error) {
					this.$buefy.toast.open(error);
				});
		},

		toggle(key) {
			var vm = this;
			if (!vm.widgets[key].visible) {
				vm.widgets[key].visible = true;
			} else {
				vm.widgets[key].visible = false;
			}
		},
	},
	created() {
		this.storyId = this.$route.params.id;
		//this.storyTitle = this.$route.params.title;
		//todo move to vuex
		axios
			.post('/api/getStoryItems', { id: this.$route.params.id })
			.then((response) => {
				if (response.status === 200) {
					this.currentStoryItems = response.data;
				} else {
					this.uploadError = true;
				}
			})
			.catch((err) => {
				this.uploadError = true;
				console.error(err);
			});
	},
};
</script>

<style scoped>
.element {
	border: solid 1px black;
	border-radius: 2px;
	margin: 4px;
}
.icon {
	margin: 4px;
}
</style>
