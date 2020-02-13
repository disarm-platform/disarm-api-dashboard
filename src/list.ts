import CONFIG from '@/config';
import { OutgoingCombinedRecord } from './types';
import { get_auth_header } from './auth';

export async function fetch_list(): Promise<OutgoingCombinedRecord[]> {
  const auth_header = get_auth_header();
  if (!auth_header) {
    throw new Error('No authorisation key');
  }

  try {
    const url = `${CONFIG.api_url}/list`;
    const headers = {
      ...auth_header,
    };
    const data = await fetch(url, { headers });
    const json = await data.json();
    return json;
  } catch (error) {
    throw error;
  }
}
