export interface AirtableRecord {
  function_name: string;
  image_version: string;
  repo: string;
  scale_to_zero: boolean;
  hide_from_deploy: boolean;
  test_req: string;
}

export interface OpenFaasRecord {
  name: string;
  image: string;
  invocationCount: number;
  replicas: number;
  availableReplicas: number;
}

export interface BasicRecord {
  function_name: string;
  missing_from_airtable: boolean;
  missing_from_openfaas: boolean;

  // Airtable
  hide_from_deploy: boolean | null;
  repo: string | null;
  target_image_version: string | null;
  scale_to_zero: boolean;
  test_req: string | null;

  // OpenFaas
  deployed_image_version: string | null; // openfaas_record.image
  deployed_invocation_count: number | null; // openfaas_record.invocationCount
  available_replicas: number | null; // openfaas_record.availableReplicas
}

export interface ComputedRecord {
  // Computed
  deployed: boolean;
  hideable: boolean;
  running: boolean;
  sleeping: boolean;
  upgradable: boolean;
  testable: boolean;
}

export interface CombinedRecord extends BasicRecord {
  computed: ComputedRecord;
}
