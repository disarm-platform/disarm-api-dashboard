import express from 'express';

export default async function(req: express.Request, res: express.Response) {
  if (req.headers.authorization !== process.env.AUTHORIZATION) {
    res.writeHead(401);
    res.end('Unauthorised');
    return;
  } else {
    res.writeHead(200);
    res.end();
    return;
  }
}
