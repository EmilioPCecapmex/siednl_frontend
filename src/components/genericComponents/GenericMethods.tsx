export function clearInfo(info: string) {
  return info
    .replaceAll('"', "")
    .replaceAll("'", "")
    .replaceAll("\n", "")
    .trimEnd().toUpperCase();
}