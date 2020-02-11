import express from 'express';

import { list } from './list';
import { deploy, undeploy } from './actions';

exports.get_data = async (req: express.Request, res: express.Response) => {
  const [, command, function_name] = req.path.split('/'); // Yup, need that first comma!

  switch (command) {
    case '':
      list(req, res);
      break;
    case 'list':
      list(req, res);
      break;
    case 'deploy':
      deploy(req, res);
      break;
    case 'undeploy':
      if (function_name) {
        undeploy(req, res, function_name);
      } else {
        res.writeHead(400);
        res.end('Missing function_name in path');
        return;
      }
      break;
    default:
      res.writeHead(400);
      res.end('Unknown request - not sure what you\'re trying to do. Check request');
      break;
  }
};
