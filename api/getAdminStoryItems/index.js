module.exports = async function (context, req) {
	let docs = context.bindings.inputDocumentIn; // outputDocument
	if (!req.body.id) {
		context.res = {
			status: 404,
			body: 'Must pass an id property in the body',
		};
	}

	let items = docs.filter((doc) => doc.storyId == req.body.id);

	context.res = {
		body: items,
	};

	context.done();
};
