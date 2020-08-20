/*const CosmosClient = require('@azure/cosmos');
const endpoint = process.env.VUE_APP_COSMOS_ENDPOINT;
const key = process.env.VUE_APP_COSMOS_KEY;
const database = process.env.VUE_APP_COSMOS_DATABASE;
const collections = {
	stories: process.env.VUE_APP_COSMOS_STORIES_COLLECTION,
};

export default {
	constructor(collection) {
		this.client = new CosmosClient({ endpoint, key });

		this.database = this.client.database(database);
		this.container = this.database.container(collections[collection]);
	},
};*/
