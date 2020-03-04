import { OutgoingCombinedRecord, BusActions } from '../types';
import { extract_github_bits } from './deploy';
import CONFIG from '@/lib/config';
import { EventBus } from '../lib/event_bus';

export async function get_test_req_json(row: OutgoingCombinedRecord): Promise<string> {
  if (!row.repo) {
    return `test_req.json not found, place test data here `;
  }
  try {
    const { org, repo } = extract_github_bits(row.repo!);
    const url = `https://raw.githubusercontent.com/${org}/${repo}/master/test_req.json`;
    const res = await fetch(url);
    const body = await res.text();
    return body;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function test(fn_name: string, test_req: any): Promise<string> {
  const url = `${CONFIG.cors_proxy}/${CONFIG.openfaas_url}/function/${fn_name}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, */*',
  };

  try {
    const request = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(test_req),
      headers,
    });
    const response = await request;
    if (response.status !== 200) {
      return `Function ${fn_name} returned ${response.status} error.`;
    }

    return request.text();
  } catch (error) {
    throw error;
  }
}