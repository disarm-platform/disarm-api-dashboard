import dotenv from 'dotenv';
import ui_config from '../src/config';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const CONFIG = {
  airtable_url: process.env.AIRTABLE_URL,
  airtable_key: process.env.AIRTABLE_KEY,
  openfaas_url: ui_config.openfaas_url,
  openfaas_key: process.env.OPENFAAS_KEY,
};
