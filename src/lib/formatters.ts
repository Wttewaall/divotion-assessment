/**
 * Strips out all characters other than digits [0-9], default to 0
 * @param value string
 * @returns number with a minimum value of 0
 */
export function toUintValue(value: string | number) {
  return parseInt(value.toString().replace(/\D/g, '')) || 0;
}
