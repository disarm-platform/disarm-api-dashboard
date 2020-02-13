import CONFIG from '@/config';

export function set_auth(username: string, password: string): void {
  const base64_string = btoa(`${username}:${password}`);
  const auth_string = `Basic ${base64_string}`;
  localStorage.setItem(CONFIG.auth_key, auth_string);
}

export function get_auth(): string | null {
  return localStorage.getItem(CONFIG.auth_key);
}

export function get_auth_header() {
  const auth_string = get_auth();
  if (auth_string) {
    return { Authorization: auth_string };
  } else {
    return null;
  }
}

export function remove_auth() {
  localStorage.removeItem(CONFIG.auth_key);
}
