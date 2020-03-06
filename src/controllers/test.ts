import { FnGetSample, FnDoRequest } from '../types';
import { extract_github_bits } from './deploy';
import CONFIG from '@/lib/config';

export const get_test_req_json: FnGetSample = async (row) => {
  if (!row.repo) {
    return;
  }
  try {
    const { org, repo } = extract_github_bits(row.repo!);
    const url = `https://raw.githubusercontent.com/${org}/${repo}/master/test_req.json`;
    const res = await fetch(url);
    const body = await res.text();
    return body;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const test: FnDoRequest = async (row, options) => {
  const url = `${CONFIG.cors_proxy}/${CONFIG.openfaas_url}/function/${row.function_name}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, */*',
  };

  try {
    const request = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(options),
      headers,
    });
    const response = await request;
    if (response.status !== 200) {
      return `Function ${row.function_name} returned ${response.status} error.`;
    }

    return request.text();
  } catch (error) {
    throw error;
  }
};
