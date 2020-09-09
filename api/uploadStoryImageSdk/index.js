// @ts-check

/* 
Need to set the following local.settings.json keys
- AZURE_STORAGE_CONNECTION_STRING, the storage connection string 
- AZURE_STORAGE_ACCOUNT_NAME, the account name
- BLOB_CONTAINER, ususally `images`
*/

const { BlobServiceClient } = require("@azure/storage-blob");
const formdata = require("multipart-formdata");
const { v1: uuid } = require('uuid');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER);
const getBlobName = (originalName) => {
  return `${uuid()}-${originalName}`;
};

module.exports = async function (context, req) {
  const boundary = formdata.getBoundary(req.headers["content-type"]);
  const [file] = formdata.parse(req.body, boundary);
  const blobName = getBlobName(file.filename);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const URL = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.BLOB_CONTAINER}/${blobName}`;
  try {
    await blockBlobClient.upload(file.data, file.data.length);
    context.bindings.res = {
      headings: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: URL
      })
    }
    context.done();
  } catch (err) {
    context.bindings.res = {
      status: 404,
      body: err.message
    }
    context.done();
  }
}