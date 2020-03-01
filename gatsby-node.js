export * from './gatsby/set-fields';

export async function createPages(...args) {
  /**
   * The reason for sometimes skipping creating pages and sometimes dynamically
   * importing the `createPages` module is because we rely on auto generated
   * types in `createPages`. But this fails when we try to download the schema
   * via `gatsby repl` if we statically export `createPages` with failed types.
   */
  if (process.argv.includes('repl')) return;

  const { createPages } = await import('./gatsby/create-pages');
  await createPages(...args);
}
