import axios from 'axios';
import express from 'express';
import { CONFIG } from './config';
import { has_required_deploy_params, action_error, action_success } from './utils';

export default async function(req: express.Request, res: express.Response) {
  try {
    if (!has_required_deploy_params(req)) {
      return action_error(res, 'Missing required service or image parameters for deploy');
    }
    const url = `${CONFIG.openfaas_url}/system/functions`;
    const headers = { Authorization: CONFIG.openfaas_key };
    const data = req.body;
    // console.log('url, headers, data', url, headers, data);
    const fn_res = await axios.post(url, data, { headers });
    // console.log(fn_res.data);
    return action_success(res, `Deployed ${JSON.stringify(req.body)}`);
  } catch (e) {
    console.log(e);
    if ('response' in e) {
      console.log(e);
      return action_error(res, e.response.data);
    } else {
      return action_error(res, e.message);
    }
  }
}
