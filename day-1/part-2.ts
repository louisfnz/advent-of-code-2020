import {readFileSync} from 'fs';
import {findThree} from './lib';

const input = readFileSync('input.txt', 'utf-8');
const entries = input.trim().split('\n').map((entry: string) => Number(entry.trim()));

const part2 = findThree(entries, 2020);
if (part2) console.log(part2[0] * part2[1] * part2[2]);
