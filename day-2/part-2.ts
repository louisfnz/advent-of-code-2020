import {readFileSync} from 'fs';
import {processEntry} from "./lib";

const input = readFileSync('input.txt', 'utf-8');
const entries = input.trim().split('\n').map(processEntry);

let valid = 0;

for (const entry of entries) {
    const charArray = entry.password.split('');
    const first = charArray[entry.positions[0]-1] === entry.letter;
    const second = charArray[entry.positions[1]-1] === entry.letter;

    if ((first && !second) || (!first && second )) {
        valid++;
    }
}

console.log(valid);
