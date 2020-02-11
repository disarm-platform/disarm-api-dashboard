import express from 'express';

export function has_required_deploy_params(req: express.Request): boolean {
  const { service, image } = req.body;
  return service && image;
}
export function action_success(res: express.Response, message: string = 'General success') {
  res.writeHead(200);
  res.end(message);
}
export function action_error(res: express.Response, message: string) {
  res.writeHead(500);
  console.log('message', message);
  res.end(message);
}
