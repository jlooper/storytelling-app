const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
	const storyRequest = {};
	storyRequest.title = req.body.title;

	console.log(storyRequest);
	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'stories';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	await container.items.create(storyRequest).catch((err) => {
		console.log(err);
		context.done();
	});
};
