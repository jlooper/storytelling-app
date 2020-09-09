// @ts-check
const formdata = require("multipart-formdata");

module.exports = (context, req) => {
	try {

		if (req.body) {
			const boundary = formdata.getBoundary(req.headers["content-type"]);
			const [file] = formdata.parse(req.body, boundary)

			context.bindings.storage = file.data;
			context.done();
		} else {
			return endWithBadResponse(context, `Request Body is not defined`);
		}
	} catch (err) {
		context.log.error(err.message);
		throw err;
	}
};

function endWithBadResponse(context, message = "Bad Request") {
	context.log.error(message);
	context.bindings.response = {
		status: 400,
		body: message,
	};
	context.done();
}
