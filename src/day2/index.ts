import * as fs from 'fs';
import * as path from 'path';

const contents = fs
  .readFileSync(path.join(__dirname, 'input.prod'), {encoding: 'utf-8'})
  .toString();

const instructions = contents
  .split('\n')
  .filter(x => Boolean(x))
  .map(x => {
    const [direction, n] = x.split(' ');
    return {
      direction,
      n: parseInt(n),
    };
  });

const submarine = {
  horizontalPosition: 0,
  depth: 0,
  aim: 0,
};

function partOne() {
  for (const instruction of instructions) {
    switch (instruction.direction) {
      case 'forward':
        submarine.horizontalPosition += instruction.n;
        break;
      case 'up':
        submarine.depth -= instruction.n;
        break;
      case 'down':
        submarine.depth += instruction.n;
        break;
    }
  }
  return submarine.depth * submarine.horizontalPosition;
}

function partTwo() {
  for (const instruction of instructions) {
    switch (instruction.direction) {
      case 'forward':
        submarine.horizontalPosition += instruction.n;
        submarine.depth += submarine.aim * instruction.n;
        break;
      case 'up':
        submarine.aim -= instruction.n;
        break;
      case 'down':
        submarine.aim += instruction.n;
        break;
    }
  }
  console.log(submarine.horizontalPosition * submarine.depth);
}

partTwo();
