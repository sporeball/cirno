/**
 * project tokenizer
 */

export default function tokenize (code) {
  const stream = code
    .split('\n')
    .filter(line => line.length !== 0)
    .flatMap(line => line.split(' '));
  // TODO
  return stream;
}
