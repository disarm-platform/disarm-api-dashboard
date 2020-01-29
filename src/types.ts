export type OutgoingCombinedRecord = OutgoingBasicRecord & OutgoingAirtableSection & OutgoingOpenfaasSection;

export interface OutgoingBasicRecord {
  function_name: string;
  missing_from_airtable: boolean;
  missing_from_openfaas: boolean;
}

export interface OutgoingAirtableSection {
  repo?: string;
  target_image_version?: string;
}

export interface OutgoingOpenfaasSection {
  deployed_image_version?: string; // openfaas_record.image
  deployed_invocation_count?: number; // openfaas_record.invocationCount
  replicas?: number; // openfaas_record.replicas
}
