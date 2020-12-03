import {readFileSync} from 'fs';
import {adjustRowLength, countTrees, Vector} from "./lib";

const slope: Vector = [3, 1];
const input: string = readFileSync('input.txt', 'utf-8');
const rows: string[] = input.trim().split('\n').map((row, r) => adjustRowLength(row.trim(), r, slope));
const trees = countTrees(rows, slope);

console.log('Result: ' + trees);
