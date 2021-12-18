import {readFileSync} from 'fs';
import * as path from 'path';

const content: string = readFileSync(path.join(__dirname, 'input.prod'), {
  encoding: 'utf-8',
})
  .toString()
  .trim();

const polymerTemplate: string[] = content.split('\n\n')[0].split('');
const rules: Map<string, string>[] = content
  .split('\n\n')[1]
  .split('\n')
  .map(line => line.split(' -> '))
  .filter(Boolean)
  .map(([a, b]) => {
    return new Map<string, string>([[a, b]]);
  });

function getValue(template: string[], rules: Map<string, string>[]) {
  let values: string[][] = [];
  for (let i = 0; i < template.length; i++) {
    let key: string = template[i] + template[i + 1];
    for (let rule of rules) {
      if (rule.has(key)) {
        values.push([String(i + 1), String(rule.get(key))]);
      }
    }
  }
  return values.map(([index, value]) => [parseInt(index), value]);
}

function modifyPolymer(template: string[]): string[] {
  const toInclude = getValue(template, rules);
  let count = 0;
  for (let item of toInclude) {
    template.splice(Number(item[0]) + count, 0, String(item[1]));
    count++;
  }
  return template;
}

function findMostFrequent(items: string[]) {
	let hash: any = {};
	for (let item of items) {
		if (!hash[item]) hash[item] = 0;
		hash[item]++;
	}
	const hashToArray = Object.entries(hash);
	const sortedArray = hashToArray.sort((a , b) => Number(b[1]) - Number(a[1]))

	return sortedArray;
}

function makeSteps(step: number): string[] {
  let finalPolymer: string[] = [];
  for (let i = 0; i < step; i++) {
    if (i === 0) {
      finalPolymer = modifyPolymer(polymerTemplate);
    } else {
      finalPolymer = modifyPolymer(finalPolymer);
    }
  }
  return finalPolymer;
}

function partOne() {
	const items = findMostFrequent(makeSteps(10))
	const result = Number(items[0][1]) - Number(items[items.length - 1][1]);
	return result;
}
console.log("Part One: ", partOne());
