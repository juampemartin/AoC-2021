import * as fs from 'fs';
import * as path from 'path';
import {dirs}  from './recursion-values';

const data: number[][] = fs
  .readFileSync(path.join(__dirname, 'input.prod'), {encoding: 'utf-8'})
  .toString()
  .trim()
  .split('\n')
  .map(line => {
    return line.split('').map(value => parseInt(value));
  });

const seen: boolean[][] = new Array(data.length).fill(0).map((_: number) => {
		return new Array(data[0].length).fill(false) as boolean[];
});

const width: number = data[0].length;
const height: number  = data.length;
const totalElements: number = width * height;

let riskLevel: number = 0

async function recurseMatrix(map: number[][], seen: boolean[][], seenN: number, r: number, c: number): Promise<boolean> {
	if (seenN === totalElements) {
		console.log(riskLevel)
		return true;
	}

	if (r < 0 || r >= map.length || c < 0 || c >= map[0].length) {
		return false;
	}

	if (seen[r][c] === true) {
		return false;
	}

	if (
		(!(r - 1 >= 0) || map[r][c] < map[r - 1][c]) &&
		(!(r + 1 < height) || map[r][c] < map[r + 1][c]) &&
		(!(c - 1 >= 0) || map[r][c] < map[r][c - 1]) &&
		(!(c + 1 < width) || map[r][c] < map[r][c + 1])
	) {
		riskLevel += map[r][c] + 1
	}
	seen[r][c] = true;
	seenN++;

	let res = false;
	for (let i  = 0; i < dirs.length; i++) {
		res = res = await recurseMatrix(map, seen, seenN, r + dirs[i][1], c + dirs[i][2])

		if (res) {
			break;
		}
	}
	return res;
}

console.log("Part One:", recurseMatrix(data, seen, 0, 0, 0))
