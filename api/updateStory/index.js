module.exports = async function (context, req) {
	console.log(req);
	let docs = context.bindings.inputDocumentIn; // outputDocument
	if (!req.body.id) {
		context.res = {
			status: 404,
			body: 'Must pass an id property in the body',
		};
	}

	let oldDoc = docs.find((doc) => doc.id == req.body.id);
	console.log(oldDoc);
	if (!oldDoc) {
		context.res = {
			status: 404,
		};
	} else {
		let updatedDoc = {
			...oldDoc,
			...req.body,
		};
		context.bindings.outputDocument = updatedDoc;
		context.done();
		context.res = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedDoc),
		};
	}
};
