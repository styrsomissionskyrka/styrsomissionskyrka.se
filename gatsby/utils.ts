import * as path from 'path';
import * as fs from 'fs';

const { access } = fs.promises;

/**
 * Resolve the first available template path
 */
export async function resolveTemplate(templates: string[]): Promise<string> {
  for (let file of templates) {
    const filePath = path.resolve(__dirname, '../src/templates', file);
    if (await exists(filePath)) return filePath;
  }

  throw new Error(
    'Could not locate any of the following templates:\n' +
      templates.map(t => `  - ${t}`).join('\n'),
  );
}

/**
 * Check if a file exists on disk by determining if it's readable, or an optiona
 * other mode
 */
export async function exists(
  file: string,
  mode: number = fs.constants.R_OK,
): Promise<boolean> {
  try {
    await access(file, mode);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * This is merly a proxy function that will bypass any tagged template string it
 * finds and return the string again. In our context this function is used to
 * "trick" the Apollo cli's type generator. When it finds a function called
 * `graphql` with tagged template literals it will extract types from it.
 *
 * @param templates Template strings array
 */
export const graphql = (templates: TemplateStringsArray) => {
  return templates.join('');
};
