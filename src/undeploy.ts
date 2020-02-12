import CONFIG from '@/config';

export async function undeploy(function_name: string): Promise<string> {
  const url = `${CONFIG.api_url}/undeploy`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, */*',
  };
  try {
    const request = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({function_name}),
      headers,
    });
    const response = await request;
    if (typeof response.text !== 'function') {
      return `Encountered an ${response.statusText} trying to deploy ${function_name}}`;
    }
    return request.text();
  } catch (error) {
    throw error;
  }
}


