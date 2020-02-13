const secrets: string[] = [];

export default {
  // all values must be the strings
  api_url: '/api',
  openfaas_url: process.env.VUE_APP_OPENFAAS_URL || 'https://faas.srv.disarm.io',
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
  cors_proxy: process.env.VUE_APP_CORS_PROXY || 'https://cors-anywhere.srv.disarm.io',
};
