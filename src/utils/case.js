/* eslint-disable import/prefer-default-export */
export function camelToSnakeCase(string) {
  return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
