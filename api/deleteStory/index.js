const CosmosClient = require('@azure/cosmos').CosmosClient;
//todo, delete story items as well
module.exports = async function (context, req) {
	const storyRequest = {
		id: req.body.id,
		title: req.body.title,
	};
	console.log(storyRequest);

	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'stories';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	try {
		await container.item(storyRequest.id, storyRequest.title).delete();
		context.res = {
			body: { message: 'You have successfully deleted a story' },
		};
		context.done();
	} catch (error) {
		context.res = { body: { message: error } };
		context.done();
	}
};
