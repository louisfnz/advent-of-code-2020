import {readFileSync} from 'fs';
import {hasPair} from "./lib";
const input: number[] = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/).map(Number);

for (let i = 25; i < input.length; i++) {
    const result = hasPair(input.slice(i - 25, i), input[i]);
    if (!result) {
        console.log('Result: ' + input[i]);
        break;
    }
}
