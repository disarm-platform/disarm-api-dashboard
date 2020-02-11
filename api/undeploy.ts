import axios from 'axios';
import express from 'express';
import { CONFIG } from './config';
import { action_error, action_success } from './utils';

export default async function(req: express.Request, res: express.Response) {
  try {
    const function_name = req.body.function_name;
    const url = `${CONFIG.openfaas_url}/system/functions`;
    const headers = { Authorization: CONFIG.openfaas_key };
    const params = { functionName: function_name };
    // data property required below because it's a DELETE method
    await axios.delete(url, { headers, data: params });
    return action_success(res, `Success undeploying ${function_name}`);
  } catch (error) {
    if ('response' in error) {
      return action_error(res, error.response.data);
    } else {
      console.error(error);
      return action_error(res, error.message);
    }
  }
}
