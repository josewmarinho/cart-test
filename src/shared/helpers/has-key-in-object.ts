export function hasKey<K extends string, T extends object>(
  key: K,
  object: T,
): object is T & Record<K, unknown> {
  return key in object;
}
