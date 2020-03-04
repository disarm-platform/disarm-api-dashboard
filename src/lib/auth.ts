import { Login } from '@/types';

export function make_auth_string(options: Login): string {
  const base64_string = btoa(`${options.username}:${options.password}`);
  return `Basic ${base64_string}`;
}

export function make_auth_header(auth_string: string): { Authorization: string } {
  return { Authorization: auth_string };
}
