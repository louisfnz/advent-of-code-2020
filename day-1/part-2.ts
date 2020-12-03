import {readFileSync} from 'fs';
import {findThree} from './lib';

const input = readFileSync('input.txt', 'utf-8');
const entries = input.trim().split('\n').map((entry: string) => Number(entry.trim()));

const foundEntries = findThree(entries, 2020);

if (!foundEntries) throw new Error('No result found');

console.log('Result: ' + (foundEntries[0] * foundEntries[1] * foundEntries[2]));
