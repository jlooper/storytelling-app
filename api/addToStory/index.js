const CosmosClient = require('@azure/cosmos').CosmosClient;

module.exports = async function (context, req) {
	var cosmos_config = {};
	cosmos_config.endpoint = process.env['VUE_APP_COSMOS_ENDPOINT'];
	cosmos_config.key = process.env['VUE_APP_COSMOS_KEY'];

	const client = new CosmosClient(cosmos_config);
	const databaseId = 'storytelling';
	const containerId = 'stories';

	const database = client.database(databaseId);
	const container = database.container(containerId);

	const querySpec = {
		query: 'SELECT * FROM stories s WHERE  s.id = @id',
		parameters: [
			{
				name: '@id',
				value: req.body.storyId,
			},
		],
	};

	const results = await container.items.query(querySpec).fetchAll();

	console.log(results);

	if (results.length == 0) {
		throw 'No items found matching';
	} else if (results.length > 1) {
		throw 'More than 1 item found matching';
	}

	const story = results[0];

	const storyRequest = {
		id: req.body.storyId,
		items: {
			id: req.body.id,
		},
	};

	story.items.push(storyRequest);

	console.log(story);

	try {
		const { item } = await container.items.upsert(story);
		context.res = { body: { id: item.id, message: 'Item added to story' } };
		context.done();
	} catch (error) {
		context.res = { body: 'Sorry, there was a problem' };
		context.done();
	}
};
