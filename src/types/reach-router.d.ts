declare module '@reach/router/lib/utils' {
  export function insertParams(
    path: string,
    params: Record<string, string | number | null | undefined>,
  ): string;
}
