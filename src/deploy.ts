import YAML from 'yaml';
import { cloneDeep } from 'lodash';
import CONFIG from './config';
import { OutgoingCombinedRecord } from './types';

export interface DeployParams {
  service: string;
  image: string;
  envVars: any;
  labels: any;
  secrets: string[];
}

interface StackJSON {
  image: string;
  environment: any;
  labels: any;
  secrets: any[];
}

function make_base_params() {
  const envVars = cloneDeep(CONFIG.default_deploy_params.envVars);
  const labels = cloneDeep(CONFIG.default_deploy_params.labels);
  const secrets = cloneDeep(CONFIG.default_deploy_params.secrets);
  return {
    envVars, labels, secrets,
  };
}

export async function deploy(row: OutgoingCombinedRecord) {
  let params;
  if (row.target_image_version) {
    params = simple_params(row);
  } else if (row.repo) {
    params = await repo_params(row);
  } else {
    console.error(`Trying to deploy without a repo or an image: ${JSON.stringify(row)}`);
    return;
  }

  console.log(params);

  const url = `${CONFIG.api_url}/deploy`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, */*',
  };

  try {
    const request = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(params),
      headers,
    });
    console.log('request', request);
  } catch (error) {
    console.log(error);
  }
}

function simple_params(row: OutgoingCombinedRecord): DeployParams | undefined {
  if (!row.target_image_version) {
    return;
  }
  const base_params = make_base_params();
  return {
    ...base_params,
    service: row.function_name,
    image: row.target_image_version,
  };
}

async function repo_params(row: OutgoingCombinedRecord): Promise<DeployParams | undefined> {
  const base_params = make_base_params();
  const stack_json = await get_stack_json(row);

  if (!stack_json) {
    throw new Error('Problem: no stack_json created');
  }

  if (stack_json) {
    base_params.envVars = { ...base_params.envVars, ...stack_json.environment };
    base_params.labels = { ...base_params.labels, ...stack_json.labels };
    base_params.secrets = [...base_params.secrets, ...stack_json.secrets];
  }

  const deploy_params: DeployParams = {
    ...base_params,
    service: row.function_name,
    image: row.target_image_version || stack_json.image,
  };

  return deploy_params;
}

async function get_stack_json(row: OutgoingCombinedRecord): Promise<StackJSON | undefined> {
  if (!row.repo) {
    throw new Error(`Problem: missing repo property`);
  }

  try {
    const { org, repo } = extract_github_bits(row.repo!);
    const url = `https://raw.githubusercontent.com/${org}/${repo}/master/stack.yml`;
    const res = await fetch(url);
    const body = await res.text();
    const stack_yml = YAML.parse(body);
    return parse_stack_yml(stack_yml);
  } catch (error) {
    console.error(error);
  }
}

function extract_github_bits(repo_url: string) {
  const [, , domain, org, repo] = repo_url.split('/');
  if (domain !== 'github.com') {
    throw new Error('Non-Github repo passed in: only configured to handle GH for now');
  }
  // TODO: Check this a bit more...
  return {
    org,
    repo,
  };
}

function parse_stack_yml(stack_yml: any): StackJSON | undefined {
  if (Object.keys(stack_yml.functions).length > 1) {
    throw new Error('More than 1 function defined in stack.yml. Cannot reliably select one');
  }
  const fn: any = Object.values(stack_yml.functions)[0];
  return {
    image: fn.image,
    environment: fn.environment,
    labels: fn.labels,
    secrets: fn.secrets,
  };
}
