import CONFIG from '@/config';

export async function undeploy(function_name: string): Promise<string> {
  try {
    const undeploy_url = `${CONFIG.api_url}/undeploy`;
    const params = {
      function_name,
    };
    const data = await fetch(undeploy_url, { body: JSON.stringify(params) });
    const message = await data.text();
    return message;
  } catch (error) {
    console.error(error);
    throw (error);
  }
}
