import CONFIG from '@/config';
import { OutgoingCombinedRecord, CustomErrors } from './types';
import { get_auth_header } from './auth';

export async function fetch_list(): Promise<OutgoingCombinedRecord[]> {
  try {
    const url = `${CONFIG.api_url}/list`;
    const headers = {};
    const data = await fetch(url, { headers });
    if (data.status === 200) {
      const json = await data.json();
      return json;
    } else {
      throw new Error('Unknown problem');
    }
  } catch (error) {
    throw error;
  }
}
