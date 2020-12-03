import {readFileSync} from 'fs';
import {findTwo} from './lib';

const input: string = readFileSync('input.txt', 'utf-8');
const entries: number[] = input.trim().split('\n').map((entry: string) => Number(entry.trim()));

const foundEntries = findTwo(entries, 2020);

if (!foundEntries) throw new Error('No result found');

console.log('Result: ' + (foundEntries[0] * foundEntries[1]));
