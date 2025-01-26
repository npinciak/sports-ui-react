export function flatten<T extends Object>(arr: T[][]): T[] {
  if (arr == undefined) return [];
  return ([] as T[]).concat(...arr);
}
