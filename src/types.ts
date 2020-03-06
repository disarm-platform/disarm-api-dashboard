// From https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
export type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
export interface JsonMap { [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> { }

export interface FnGetSample {
  (row: OutgoingCombinedRecord): Promise<undefined | string>;
}

export interface FnDoRequest {
  (row: OutgoingCombinedRecord, params: DeployParams): Promise<string>;
}

export interface DeployParams {
  service: string;
  image: string;
  envVars: any;
  labels: any;
  secrets: string[];
}

export interface Login {
  username: string;
  password: string;
}

export interface FileMap {
  key: string;
  data: any;
}

export type OutgoingCombinedRecord = OutgoingBasicRecord & OutgoingAlgoSection & OutgoingOpenfaasSection;

export interface OutgoingBasicRecord {
  function_name: string;
  missing_from_algos: boolean;
  missing_from_openfaas: boolean;
}

export interface OutgoingAlgoSection {
  repo?: string;
  target_image_version?: string;
}

export interface OutgoingOpenfaasSection {
  deployed_image_version?: string; // openfaas_record.image
  deployed_invocation_count?: number; // openfaas_record.invocationCount
  replicas?: number; // openfaas_record.replicas
}

export enum BusActions {
  loading_start = 'loading_start',
  loading_end = 'loading_end',
  refresh_list = 'refresh_list',
}

export enum CustomErrors {
  Auth = 'Auth',
}

// API
export interface IncomingAlgoRecord {
  function_name: string;
  image: string;
  repo: string;
}

export interface IncomingOpenFaasRecord {
  name: string;
  image: string;
  invocationCount: number;
  replicas: number;
  availableReplicas: number;
}
