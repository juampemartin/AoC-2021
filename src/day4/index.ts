import * as fs from 'fs';
import * as path from 'path';

const content = fs
  .readFileSync(path.join(__dirname, 'input.prod'), {
    encoding: 'utf-8',
  })
  .split('\n\n')
  .filter(x => Boolean(x))
  .map(x =>
    x
      .replace(/[\n ,]+/g, ' ')
      .trim()
      .split(' ')
      .map(y => parseInt(y)),
  );

let [drawnNumbers, ...cards] = content;

class Card {
  numbers: Array<Number>;
  lines: Array<number>;
  columns: Array<number>;
  cardSize: number;
  numberToPosition: any;
  isComplete: boolean;
  markedNumbers: any;

  constructor(numbers) {
    this.cardSize = 5;
    this.numbers = numbers;
    this.numberToPosition = new Map();
    for (let i = 0; i < this.numbers.length; i++) {
      const n = this.numbers[i];
      this.numberToPosition.set(n, {
        line: Math.floor(i / this.cardSize),
        column: i % this.cardSize,
      });
    }
    this.lines = Array(this.cardSize).fill(0);
    this.columns = Array(this.cardSize).fill(0);
    this.isComplete = false;
    this.markedNumbers = new Set();
  }

  addMarkedNumber(number: Array<number>) {
    const position = this.numberToPosition.get(number);
    if (!position) {
      return;
    }
    this.markedNumbers.add(number);
    this.lines[position.line]++;
    this.columns[position.column]++;
    if (
      this.lines[position.line] === this.cardSize ||
      this.columns[position.column] === this.cardSize
    ) {
      this.isComplete = true;
    }
  }

  unmarkedNumbers() {
    return this.numbers.filter(n => !this.markedNumbers.has(n));
  }

  showCard() {
    const array = [];
  }
}
