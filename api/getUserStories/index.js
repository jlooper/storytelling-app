module.exports = async function (context, req) {
	let docs = context.bindings.inputDocumentIn; // outputDocument
	if (!req.body.userId) {
		context.res = {
			status: 404,
			body: 'Must pass an id property in the body',
		};
	}
	let items = docs.filter((doc) => doc.userId == req.body.userId);
	context.res = {
		body: items,
	};

	context.done();
};
