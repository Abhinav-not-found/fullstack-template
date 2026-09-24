export function getErrorLocation(error: Error): string | undefined {
  return error.stack
    ?.split('\n')
    .slice(1)
    .find((line) => line.includes('/module/') && !line.includes('node_modules'))
    ?.trim();
}
