const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
	const storyItemRequest = req.body;

	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'storyItems';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	try {
		const { item } = await container.items.create(storyItemRequest);
		context.res = { body: { id: item.id, message: 'You have successfully added a story item!' } };
		context.done();
	} catch (error) {
		context.res = { body: 'Sorry, there was a problem' };
		context.done();
	}
};
