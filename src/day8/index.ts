import * as fs from 'fs';
import * as path from 'path';

let content = fs
  .readFileSync(path.join(__dirname, 'test.prod'), {
    encoding: 'utf-8',
  })
  .toString()
  .trim();

let starOne = () => {
  let digits = content.split('\n').map(line => {
    return line.split(' | ')[1].split(' ');
  });
  let count = 0;
  digits.forEach(lineOfDigits => {
    lineOfDigits.forEach(digit => {
      if (
        digit.length === 2 ||
        digit.length === 4 ||
        digit.length === 3 ||
        digit.length === 7
      ) {
        count += 1;
      }
    });
  });
  return count;
};

type Display = {
  uniqueDigits: string[];
  displayValue: string[];
};

type Signal = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';
type SignalMap = Record<Signal, Signal>;

const correctWireMappingsFor = (uniqueDigits: string[]): SignalMap => {
  // c and f
  let one = (uniqueDigits.find(
    signals => signals.length === 2,
  ) as string).split('');

  let four = (uniqueDigits.find(
    signals => signals.length === 4,
  ) as string).split('');

  let seven = (uniqueDigits.find(
    signals => signals.length === 3,
  ) as string).split('');

  let a = seven.find(letter => !one.includes(letter)) as Signal;

  // a, b, c, d, f
  let three = (uniqueDigits.find(signals => {
    return (
      signals.length === 5 && one.every(letter => signals.includes(letter))
    );
  }) as string).split('');

  // d: in three and four, but not one
  let d = three.find(letter => {
    return !one.includes(letter) && four.includes(letter);
  }) as Signal;

  // g: in three and not a, d, c, or f
  let g = three.find(letter => {
    return !one.includes(letter) && letter !== a && letter !== d;
  }) as Signal;

  let six = (uniqueDigits.find(signals => {
    return signals.length === 6 && !one.every(cOrF => signals.includes(cOrF));
  }) as string).split('');

  let f = one.find(cOrF => six.includes(cOrF)) as Signal;
  let c = one.find(cOrF => !six.includes(cOrF)) as Signal;

  // a, d, f, g, but not c and length 5
  let five = (uniqueDigits.find(signals => {
    return (
      signals.length === 5 &&
      signals.includes(a) &&
      signals.includes(d) &&
      signals.includes(f) &&
      signals.includes(g) &&
      !signals.includes(c)
    );
  }) as string).split('');

  let b = five.find(letter => {
    return ![a, d, f, g].includes(letter as Signal);
  }) as Signal;

  // a, c, d, g but not f && length 5
};
