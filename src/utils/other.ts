/**
 *
 * @param str 驼峰转下划线
 * @returns 下划线
 */
export function toUnderline(str: string) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
