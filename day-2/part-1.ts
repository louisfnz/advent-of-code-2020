import {readFileSync} from 'fs';
import {PasswordObject, processEntry} from "./lib";

const input: string = readFileSync('input.txt', 'utf-8');
const entries: PasswordObject[] = input.trim().split('\n').map(processEntry);

let validEntries = 0;

for (const entry of entries) {
    const occurrences = (entry.password.match(new RegExp(entry.letter, 'g')) || []).length;
    if (occurrences >= entry.positions[0] && occurrences <= entry.positions[1]) {
        validEntries++;
    }
}

console.log('Result: ' + validEntries);
