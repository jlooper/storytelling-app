module.exports = function (context, req) {
	if (req.body && req.body) {
		context.bindings.story = JSON.stringify({
			id: req.body.id,
			title: req.body.title,
			item: req.body.item,
		});
		context.done();
		context.res = {
			status: 200,
			body: req.body,
		};
	} else {
		context.res = {
			status: 400,
			body: 'Please pass a story in the request body',
		};
	}
};
