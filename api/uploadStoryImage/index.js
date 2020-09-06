module.exports = async function (context, req) {
	const image = req.body;
	//console.log(req);
	const { BlobServiceClient } = require('@azure/storage-blob');
	const { v1: uuidv1 } = require('uuid');
	const blobServiceClient = BlobServiceClient.fromConnectionString(process.env['VUE_APP_STORAGE_CONNECTION_STRING']);
	const containerName = 'images';
	const containerClient = blobServiceClient.getContainerClient(containerName);
	const blobName = uuidv1() + '.png';
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	/*const getStream = require('into-stream');

	console.log('\nUploading to Azure storage as blob:\n\t', blobName);
	const buff = Buffer.from(image, 'base64');
	const stream = getStream(buff);
	console.log(stream);
	const streamLength = buff.length;
	const uploadBlobResponse = await blockBlobClient.uploadStream(stream, streamLength);
	console.log('Blob was uploaded successfully. requestId: ', uploadBlobResponse.requestId);
	*/
	const data = image;
	const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
	console.log('Blob was uploaded successfully. requestId: ', uploadBlobResponse.requestId);
};
