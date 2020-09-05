module.exports = async function (context, req) {
	const { BlobServiceClient } = require('@azure/storage-blob');
	const { v1: uuidv1 } = require('uuid');

	const blobServiceClient = BlobServiceClient.fromConnectionString(process.env['VUE_APP_STORAGE_CONNECTION_STRING']);
	const containerName = 'images';
	const containerClient = blobServiceClient.getContainerClient(containerName);

	// Create a unique name for the blob
	const blobName = uuidv1() + '.png';

	// Get a block blob client
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	console.log('\nUploading to Azure storage as blob:\n\t', blobName);

	const uploadBlobResponse = await blockBlobClient.uploadStream(containerName, blobName, req);
	console.log('Blob was uploaded successfully. requestId: ', uploadBlobResponse.requestId);
};
