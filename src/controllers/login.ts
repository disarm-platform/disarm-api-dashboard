import CONFIG from '@/lib/config';
import { Login } from '@/types';
import { make_auth_header, make_auth_string } from '@/lib/auth';

export async function login(options: Login): Promise<boolean> {
  const auth_string = make_auth_string(options);
  const auth_header = make_auth_header(auth_string);

  const url = `${CONFIG.api_url}/login`;
  const headers = {
    ...auth_header,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers,
    });
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
}
