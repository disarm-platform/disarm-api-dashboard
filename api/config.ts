import dotenv from 'dotenv';
import ui_config from '../src/config';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const CONFIG = {
  algos_url: process.env.ALGOS_URL || 'https://raw.githubusercontent.com/disarm-platform/algos/master/algos.json',
  openfaas_url: ui_config.openfaas_url,
  openfaas_key: process.env.OPENFAAS_KEY,
};
