import { last } from 'lodash';

interface ParseResult {
  data?: any; // There's only data if it's read from the file
  message?: string;
}

export async function load_data(file: File): Promise<ParseResult> {
  const file_content: undefined | {} = await read_file(file);

  if (!file_content) {
    return {
      message: 'No content from file',
    };
  }

  try {
    return await parse_raw_data(file.name, file_content);
  } catch (e) {
    return {
      message: 'Could not load data from file',
    };
  }
}

function read_file(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject();
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const read_result = reader.result as string;
      return resolve(read_result);
    });
    reader.readAsBinaryString(file as Blob);
  });
}

function parse_raw_data(filename: string, raw_data: any): ParseResult {
  const json_exts = ['json', 'geojson'];
  const ext = last(filename.split('.'));
  if (!ext || !json_exts.includes(ext)) {
    return {
      message: `Cannot load from file with extension '${ext}'`,
    };
  }

  try {
    return {
      data: JSON.parse(raw_data),
    };
  } catch {
    return {
      message: 'Problem parsing JSON',
    };
  }
}
