const secrets: string[] = [];

export default {
  // all values must be the strings
  api_url: process.env.VUE_APP_API_URL || 'https://europe-west1-disarm-platform.cloudfunctions.net/disarm-api-dashboard-api',
  gateway: process.env.GATEWAY || 'https://faas.srv4.disarm.io',
  default_deploy_params: {
    labels: {
      'com.openfaas.scale.zero': 'true',
    },
    secrets,
    envVars: {
      write_debug: 'true',
      exec_timeout: '600',
      write_timeout: '700',
      read_timeout: '700',
      combine_output: 'false',
    },
  },
};
