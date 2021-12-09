import * as fs from 'fs';
import * as path from 'path';

const lines = fs
  .readFileSync(path.join(__dirname, 'input.prod'), {
    encoding: 'utf-8',
  })
  .split('\n')
  .filter(x => Boolean(x));

const matrixLength = lines[0].length;

function getCount(lines: any) {
  const zeros = Array(matrixLength).fill(0);
  const ones = Array(matrixLength).fill(0);

  for (const line of lines) {
    const bits = [...line];
    bits.forEach((bit, index) => {
      if (bit === '0') {
        zeros[index]++;
      } else {
        ones[index]++;
      }
    });
  }
  return {zeros, ones};
}

function partOne() {
  const {zeros, ones} = getCount(lines);
  let gammaRate = ''; // Most common value
  let epsilonRate = ''; // Least common value

  // Calculate the gamma rate.
  for (let i = 0; i < matrixLength; i++) {
    let bit = 0;
    if (ones[i] > zeros[i]) {
      bit = 1;
    }
    gammaRate += bit;
  }

  // Calculate the epsilon rate.
  for (let i = 0; i < matrixLength; i++) {
    let bit = 1;
    if (ones[i] > zeros[i]) {
      bit = 0;
    }
    epsilonRate += bit;
  }
  const gammaDecimal = parseInt(gammaRate, 2);
  const epsilonDecimal = parseInt(epsilonRate, 2);

  return {
    gammaDecimal,
    epsilonDecimal,
    powerConsume: gammaDecimal * epsilonDecimal,
  };
}

function getOxygenRating(lines: any, index = 0): any {
  const {zeros, ones} = getCount(lines);
  let mostCommonBit = '1';
  if (zeros[index] > ones[index]) {
    mostCommonBit = '0';
  }
  const filtered = lines.filter((line: any) => line[index] === mostCommonBit);
  if (filtered.length === 1) {
    return filtered;
  } else {
    return getOxygenRating(filtered, index + 1);
  }
}

function getCO2Rating(lines: any, index = 0): any {
  const {zeros, ones} = getCount(lines);
  let leastCommonBit = '0';
  if (zeros[index] > ones[index]) {
    leastCommonBit = '1';
  }
  const filtered = lines.filter((line: any) => line[index] === leastCommonBit);
  if (filtered.length === 1) {
    return filtered;
  } else {
    return getCO2Rating(filtered, index + 1);
  }
}

function partTwo() {
  const oxygenRating = getOxygenRating(lines);
  const co2Rating = getCO2Rating(lines);

  return {
    oxygenRating,
    co2Rating,
    lifeSupportRating: parseInt(oxygenRating, 2) * parseInt(co2Rating, 2),
  };
}

console.log(partTwo());
