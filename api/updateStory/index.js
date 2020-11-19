module.exports = async function (context, req) {
	console.log(req.body);
	let docs = context.bindings.inputDocumentIn;

	if (!req.body.story.id) {
		context.res = {
			status: 404,
			body: 'Must pass an id property in the body',
		};
	}
	let oldDoc = docs.find((doc) => doc.id == req.body.story.id);

	let newDoc = {
		id: oldDoc.id,
		imageUrl: oldDoc.imageUrl,
		published: req.body.publish,
		title: oldDoc.title,
		userId: oldDoc.userId,
		_attachments: 'attachments/',
		_etag: oldDoc._etag,
		_rid: oldDoc._rid,
		_self: oldDoc._self,
		_ts: oldDoc._ts,
	};

	console.log(newDoc);
	if (!oldDoc) {
		context.res = {
			status: 404,
		};
	} else {
		let updatedDoc = {
			...oldDoc,
			...newDoc,
		};
		context.bindings.inputDocumentOut = updatedDoc;
		/*try {
			context.res = {
				body: { message: 'You have successfully edited a story' },
			};
			context.done();
		} catch (error) {
			context.res = { body: { message: error } };
			context.done();
		}*/

		context.done();
	}
};
