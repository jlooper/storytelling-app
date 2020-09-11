module.exports = function (context) {
	context.res = {
		body: context.bindings.stories,
	};

	context.done();
};
