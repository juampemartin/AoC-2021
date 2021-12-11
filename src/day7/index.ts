import * as fs from 'fs';
import * as path from 'path';

let content = fs
  .readFileSync(path.join(__dirname, 'input.prod'))
  .toString()
  .trim()
  .split(',')
  .map(item => {
    return parseInt(item);
  });

content.sort((a, b) => a - b);
let min: number = content[0];
let max: number = content[content.length - 1];

const fuelCostForDistance = (distance: number, simple: boolean): number => {
  if (!simple) {
    let acc = ((1 + distance) / 2) * distance;
    return acc;
  } else {
    let ret = 0;
    for (let i = 1; i <= distance; i++) {
      ret += 1;
    }
    return ret;
  }
};

const findFuelCost = (simple: boolean): number => {
  let possibleFuelCosts: number[] = [];
  for (let candidate = min; candidate <= max; candidate++) {
    let fuel = 0;
    content.forEach(value => {
      let distance = Math.abs(value - candidate);
      fuel += fuelCostForDistance(distance, simple);
    });
    possibleFuelCosts.push(fuel);
  }

  possibleFuelCosts.sort((a, b) => a - b);
  return possibleFuelCosts[0];
};

console.log('Part One: ', findFuelCost(true));
console.log('Part Two', findFuelCost(false));
