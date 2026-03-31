export function textShorener(value: string, length: number = 10) {
  return value.length > length ? `${value.slice(0, length)}...` : value;
}
