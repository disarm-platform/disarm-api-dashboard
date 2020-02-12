import fs from 'fs';
import axios from 'axios';
import express from 'express';
import { isUndefined, uniq, get } from 'lodash';

import { CONFIG } from './config';
import {
  IncomingAirtableRecord, IncomingOpenFaasRecord,
  OutgoingAirtableSection, OutgoingCombinedRecord, OutgoingOpenfaasSection, OutgoingBasicRecord,
} from '../src/types';

export default async function(req: express.Request, res: express.Response) {
  try {
    const data = await fetch_and_combine();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    res.writeHead(500);
    res.end(error.message || 'Not sure what happened');
  }
}

async function fetch_and_combine() {
  let openfaas_data: IncomingOpenFaasRecord[];
  let airtable_data: IncomingAirtableRecord[];

  try {
    airtable_data = await fetch_airtable();
    openfaas_data = await fetch_openfaas();
    // fs.writeFileSync('sample_responses/airtable_data.json', JSON.stringify(airtable_data));
    // fs.writeFileSync('sample_responses/openfaas_data.json', JSON.stringify(openfaas_data));
    // airtable_data = JSON.parse(fs.readFileSync('sample_responses/airtable_data.json', 'utf8'));
    // openfaas_data = JSON.parse(fs.readFileSync('sample_responses/openfaas_data.json', 'utf8'));
  } catch (e) {
    console.error(e);
    throw new Error(
      'Cannot get Airtable or OpenFaas data - check connections and/or credentials?',
    );
  }

  return combine(airtable_data, openfaas_data);
}

async function fetch_airtable(): Promise<IncomingAirtableRecord[]> {
  const url = CONFIG.airtable_url;
  if (!url) {
    throw new Error('Missing AIRTABLE_URL env var');
  }
  const headers = { Authorization: CONFIG.airtable_key };
  try {
    const res = await axios.get(url, { headers });
    const records = get(res, 'data.records', []);
    if (records) {
      return records.map((record: any) => record.fields);
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    throw new Error('Missing data from Airtable request');
  }
}

async function fetch_openfaas(): Promise<IncomingOpenFaasRecord[]> {
  //  Make request
  const url = `${CONFIG.openfaas_url}/system/functions`;
  const headers = { Authorization: CONFIG.openfaas_key };
  try {
    const res = await axios.get(url, { headers });
    // TODO: Not sure why we need to check
    if (res.data && res.data.length > 0) {
      return res.data.map((fields: any[]) => fields);
    } else {
      throw new Error('Broken');
    }
  } catch (e) {
    console.error(e);
    throw new Error('Missing data from OpenFaas request');
  }
}

function combine(
  airtable_data: IncomingAirtableRecord[], openfaas_data: IncomingOpenFaasRecord[],
): OutgoingCombinedRecord[] {
  const function_names = all_unique_names(airtable_data, openfaas_data);

  return function_names.map((function_name) => {
    const airtable_record = find_airtable_record_by_name(function_name, airtable_data);
    const openfaas_record = find_openfaas_record_by_name(function_name, openfaas_data);

    const missing_from_airtable = isUndefined(airtable_record?.function_name);
    const missing_from_openfaas = isUndefined(openfaas_record?.image);

    const basic: OutgoingBasicRecord = {
      function_name,
      missing_from_airtable,
      missing_from_openfaas,
    };

    const airtable_section: OutgoingAirtableSection = {
      repo: airtable_record?.repo,
      target_image_version: airtable_record?.image,
    };

    const openfaas_section: OutgoingOpenfaasSection = {
      deployed_image_version: openfaas_record?.image,
      deployed_invocation_count: openfaas_record?.invocationCount,
      replicas: openfaas_record?.replicas,
    };

    const combined: OutgoingCombinedRecord = {
      ...basic,
      ...airtable_section,
      ...openfaas_section,
    };

    return combined;
  });
}

function all_unique_names(airtable_data: IncomingAirtableRecord[], openfaas_data: IncomingOpenFaasRecord[]) {
  const all_names = airtable_data.map((airtable_record) => {
    return airtable_record.function_name;
  }).concat(openfaas_data.map((openfaas_record) => {
    return openfaas_record.name;
  })).sort();
  const unique = uniq(all_names);
  return unique;
}

function find_airtable_record_by_name(
  name: string, airtable_data: IncomingAirtableRecord[],
): IncomingAirtableRecord | undefined {
  return airtable_data.find((r) => r.function_name === name);
}

function find_openfaas_record_by_name(
  name: string, openfaas_data: IncomingOpenFaasRecord[],
): IncomingOpenFaasRecord | undefined {
  return openfaas_data.find((r) => r.name === name);
}
