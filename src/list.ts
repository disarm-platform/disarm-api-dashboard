import CONFIG from '@/config';
import { OutgoingCombinedRecord } from './types';

export async function fetch_list() {
    try {
        const url = `${CONFIG.api_url}/list`;
        const data = await fetch(url);
        const json = await data.json();
        return json;
    } catch (error) {
        throw error;
    }
}
