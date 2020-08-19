import { CosmosClient, Database, Container } from '@azure/cosmos';

const endpoint = process.env.VUE_APP_COSMOS_ENDPOINT;
const key = process.env.VUE_APP_COSMOS_KEY;
const database = process.env.VUE_APP_COSMOS_DATABASE;
const collections = {
	stories: process.env.VUE_APP_COSMOS_STORIES_COLLECTION,
};

export default class CosmosDBClient {
	constructor(collection) {
		this.client = new CosmosClient({ endpoint, key });

		this.database = this.client.database(database);
		this.container = this.database.container(collections[collection]);
	}
}
