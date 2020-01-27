export type BasicRecord = { function_name: string } & AirtableSection & OpenfaasSection;

export interface AirtableSection {
  repo?: string;
  target_image_version?: string;
  env_vars?: string;
  labels?: string;
  secrets?: string;
  test_req?: string;
}

export interface OpenfaasSection {
  deployed_image_version?: string; // openfaas_record.image
  deployed_invocation_count?: number; // openfaas_record.invocationCount
  replicas?: number; // openfaas_record.replicas
}

export interface ComputedSection {
  deployed: boolean;
  running: boolean;
  upgradable: boolean;
  testable: boolean;
  missing_from_airtable: boolean;
  missing_from_openfaas: boolean;
}

export interface CombinedRecord extends BasicRecord { computed: ComputedSection; }
