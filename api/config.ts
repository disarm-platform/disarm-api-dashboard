import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const CONFIG = {
  airtable_url: process.env.AIRTABLE_URL || 'https://api.airtable.com/v0/app2A1oMnkLm1B747/algos',
  airtable_key: process.env.AIRTABLE_KEY,
  openfaas_url: process.env.OPENFAAS_URL || 'https://faas.srv.disarm.io',
  openfaas_key: process.env.OPENFAAS_KEY
};
