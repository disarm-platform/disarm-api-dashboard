import CONFIG from '@/lib/config';
import store from '../store';

export async function undeploy(function_name: string): Promise<string> {
  const auth_header = store.getters.auth_header;
  if (!auth_header) {
    throw { name: 'MissingAuthError', message: 'No authorisation key' };
  }

  const url = `${CONFIG.api_url}/undeploy`;
  const headers = {
    ...auth_header,
    'Content-Type': 'application/json',
    'Accept': 'application/json, */*',
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({ function_name }),
      headers,
    });

    if (typeof response.text !== 'function') {
      return `Encountered an ${response.statusText} trying to deploy ${function_name}}`;
    }
    return response.text();
  } catch (error) {
    throw error;
  }
}
