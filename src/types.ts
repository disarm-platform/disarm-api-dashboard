export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [prop: string]: Json };

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
