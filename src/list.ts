import CONFIG from '@/config';
import { OutgoingCombinedRecord, CustomErrors } from './types';
import { get_auth_header } from './auth';

export async function fetch_list(): Promise<OutgoingCombinedRecord[]> {
  const auth_header = get_auth_header();
  if (!auth_header) {
    throw { name: CustomErrors.Auth, message: 'No authorisation key' };
  }

  try {
    const url = `${CONFIG.api_url}/list`;
    const headers = {
      ...auth_header,
    };
    const data = await fetch(url, { headers });
    if (data.status === 200) {
      const json = await data.json();
      return json;
    } else if (data.status === 401) {
      throw {name: CustomErrors.Auth, message: 'Invalid authorisation key'};
    } else {
      throw new Error('Unknown problem');
    }
  } catch (error) {
    throw error;
  }
}
