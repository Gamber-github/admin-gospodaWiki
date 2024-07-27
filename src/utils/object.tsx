export const arrify = <T,>(value: T | T[]) =>
  Array.isArray(value) ? value : [value];
