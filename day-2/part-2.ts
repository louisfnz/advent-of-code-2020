import {readFileSync} from 'fs';
import {PasswordObject, processEntry} from "./lib";

const input: string = readFileSync('input.txt', 'utf-8');
const entries: PasswordObject[] = input.trim().split('\n').map(processEntry);

let validEntries = 0;

for (const entry of entries) {
    const charArray = entry.password.split('');
    const first = charArray[entry.positions[0]-1] === entry.letter;
    const second = charArray[entry.positions[1]-1] === entry.letter;

    if ((first && !second) || (!first && second)) {
        validEntries++;
    }
}

console.log('Result: ' + validEntries);
