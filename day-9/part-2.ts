import {readFileSync} from 'fs';
import {findSet, hasPair} from "./lib";
const input: number[] = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/).map(Number);

let target = 0;

for (let i = 25; i < input.length; i++) {
    const result = hasPair(input.slice(i - 25, i), input[i]);
    if (!result) {
        target = input[i];
        break;
    }
}

for (let i = 0; i < input.length; i++) {
    const set = findSet(input, i, target);
    if (set) {
        const result = Math.min(...set) + Math.max(...set);
        console.log('Result: ' + result);
        break;
    }
}

