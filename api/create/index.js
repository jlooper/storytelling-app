module.exports = async function (context) {
	import { AzureFunction, Context, HttpRequest } from '@azure/functions';
	import { ErrorRes, returnError } from '../shared/ErrorRes';
	import CosmosDBClient from '../shared/CosmosDBClient';
	

const httpTrigger =
  async (context, req) => {
    

    const storyTitle = req.body;
    
    const storyClient = new CosmosDBClient('storytelling-db');

    let storyRes;
    try {
      storyRes = await storyClient.container.items.create(storyTitle);
    } catch (error) {
      return returnError(context, new ErrorRes(error.code, error.body.message));
    }

    context.res = {
      body: {
        ...storyRes.resource
      }
    };

  };

export default httpTrigger