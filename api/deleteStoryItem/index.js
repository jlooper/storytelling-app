const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
	const storyItemRequest = {
		id: req.body.id,
		title: req.body.title,
	};
	console.log(storyItemRequest);

	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'storyItems';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	try {
		await container.item(storyItemRequest.id).delete();
		context.res = {
			body: { message: 'You have successfully deleted a story element' },
		};
		context.done();
	} catch (error) {
		context.res = { body: error };
		context.done();
	}
};
