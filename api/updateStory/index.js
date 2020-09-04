const CosmosClient = require('@azure/cosmos').CosmosClient;

function validateStory(story) {
	const updatedStory = {
		title: story.title,
		id: story.id,
	};

	return updatedStory;
}

module.exports = async function (context, req) {
	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];
	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'stories';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	try {
		const story = req.body;
		const updatedStory = validateStory(story);
		console.log(story.id);
		const storyRes = await container.item(story.id, story.title).replace(updatedStory);

		context.res = {
			body: { ...storyRes.resource },
		};
	} catch (error) {
		context.res = {
			status: 500,
			body: error.message,
		};
	}
};
