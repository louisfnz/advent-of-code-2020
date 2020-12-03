import {readFileSync} from 'fs';
import {findTwo} from './lib';

const input = readFileSync('input.txt', 'utf-8');
const entries = input.trim().split('\n').map((entry: string) => Number(entry.trim()));

const part1 = findTwo(entries, 2020);
if (part1) console.log(part1[0] * part1[1]);
