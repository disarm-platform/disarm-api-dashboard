export function logs_url(function_name: string): string {
  const root_url = 'https://console.cloud.google.com/logs/viewer';

  const params = {
    organizationId: '330837086487',
    project: 'disarm-platform',
    minLogLevel: '0',
    expandAll: 'false',
    customFacets: '',
    limitCustomFacetWidth: 'true',
    interval: 'NO_LIMIT',
    resource: 'gce_instance/instance_id/9017316993004217383',
    dateRangeUnbound: 'forwardInTime',
    advancedFilter: `jsonPayload.container.imageName:${function_name}`,
  };
  const joined_params = Object.entries(params).map(([key, value]) => {
    return `${key}=${value}&`;
  }).join('');
  return `${root_url}?${joined_params}`;
}
