import download from 'downloadjs';

export function save_requester(object: any, type: 'request' | 'response'): void {
  const timestamp = new Date().toISOString().slice(0, 10) + '-' +
    new Date().toLocaleTimeString().replace(/:/g, '-');

  const filename = `${type}.${timestamp}.json`;
  download(object, filename);
}
