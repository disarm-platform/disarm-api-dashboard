import CONFIG from '@/lib/config';
import { OutgoingCombinedRecord, CustomErrors } from '../types';

export async function fetch_list(): Promise<OutgoingCombinedRecord[]> {
  try {
    const url = `${CONFIG.api_url}/list`;
    const data = await fetch(url);
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
