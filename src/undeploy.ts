import CONFIG from '@/config';

export async function undeploy(function_name: string): Promise<string> {
  const undeploy_url = `${CONFIG.api_url}/undeploy/${function_name}`;
  try {
    const data = await fetch(undeploy_url);
    const message = await data.text();
    console.log(message);
    return message;
  } catch (error) {
    console.error(error);
    throw (error) ;
  }
}
