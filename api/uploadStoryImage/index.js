// @ts-check

const { BlobServiceClient } = require('@azure/storage-blob');
const formdata = require('multipart-formdata');
const { v1: uuid } = require('uuid');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env['VUE_APP_STORAGE_CONNECTION_STRING']);
const containerClient = blobServiceClient.getContainerClient('images');
const getBlobName = (originalName) => {
	return `${uuid()}-${originalName}`;
};

module.exports = async function (context, req) {
	const boundary = formdata.getBoundary(req.headers['content-type']);
	const [file] = formdata.parse(req.body, boundary);
	const blobName = getBlobName(file.filename);
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const URL = `https://storytelling-db.blob.core.windows.net/images/${blobName}`;
	try {
		await blockBlobClient.upload(file.data, file.data.length);
		context.bindings.res = {
			headings: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: URL,
				message: 'Image uploaded successfully',
			}),
		};
		context.done();
	} catch (err) {
		context.bindings.res = {
			status: 404,
			body: err.message,
		};
		context.done();
	}
};
