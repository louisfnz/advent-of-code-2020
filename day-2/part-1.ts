import {readFileSync} from 'fs';
import {processEntry} from "./lib";

const input = readFileSync('input.txt', 'utf-8');
const entries = input.trim().split('\n').map(processEntry);

let valid = 0;

for (const entry of entries) {
    const occurrences = (entry.password.match(new RegExp(entry.letter, 'g')) || []).length;
    if (occurrences >= entry.positions[0] && occurrences <= entry.positions[1]) {
        valid++;
    }
}

console.log(valid);
