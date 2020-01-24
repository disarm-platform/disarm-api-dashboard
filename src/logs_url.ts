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
    advancedFilter: `resource.type="gce_instance"
%0Aresource.labels.instance_id="8492281773921412319"
%0AlogName="projects/disarm-platform/logs/gcplogs-docker-driver"
%0ANOT jsonPayload.container.imageName:openfaas
%0ANOT jsonPayload.container.imageName:traefik
%0ANOT jsonPayload.container.imageName:portainer
%0ANOT jsonPayload.container.imageName:squid
%0ANOT jsonPayload.container.imageName:prometheus
%0ANOT jsonPayload.container.imageName:alertmanager
%0AjsonPayload.container.imageName:${function_name}
%0A`,
  };
  const joined_params = Object.entries(params).map(([key, value]) => {
    return `${key}=${value}&`;
  }).join('');
  return `${root_url}?${joined_params}`;
}
