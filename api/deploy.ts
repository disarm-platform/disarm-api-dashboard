import axios from 'axios';
import express from 'express';
import { CONFIG } from './config';
import { has_required_deploy_params, action_error, action_success } from './utils';

export default async function(req: express.Request, res: express.Response) {
  if (req.headers.authorization !== process.env.AUTHORIZATION) {
    res.writeHead(401);
    res.end('Unauthorised');
    return;
  }

  try {
    if (!has_required_deploy_params(req)) {
      return action_error(res, 'Missing required service or image parameters for deploy');
    }
    const url = `${CONFIG.openfaas_url}/system/functions`;
    const headers = { Authorization: CONFIG.openfaas_key };
    const data = req.body;
    const fn_res = await axios.post(url, data, { headers });
    return action_success(res, JSON.stringify({ deployed: true, ...req.body }));
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
