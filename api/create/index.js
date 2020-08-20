const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
	console.log(req);

	const storyRequest = {
		title: req.body.title,
	};

	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'stories';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	try {
		const { item } = await container.items.create(storyRequest);
		context.res = { body: result.data };
		console.log(context);
		console.log(item);
		context.done();
	} catch (error) {
		context.res = { body: error };
		console.log(context);
		context.done();
	}
};
