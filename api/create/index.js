module.exports = async function (context, req) {
	const storyTitle = req.body;
	const CosmosClient = require('@azure/cosmos').CosmosClient;

	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'stories';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	let storyRes;
	try {
		storyRes = await container.items.create(storyTitle);
	} catch (error) {
		return error;
	}

	context.res = {
		body: {
			storyRes,
		},
	};
};