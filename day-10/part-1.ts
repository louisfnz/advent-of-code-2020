import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim();

const adapters = input.split(/\r?\n/).map(Number).sort((n1: number, n2: number) => n1 - n2);

adapters.splice(0, 0, 0);
adapters.push(adapters[adapters.length - 1] + 3);

const differences = [0,0];

for (let i = 1; i < adapters.length; i++) {
    const difference = adapters[i] - adapters[i-1];
    if (difference === 1) differences[0]++;
    if (difference === 3) differences[1]++;
}

console.log('Result: ' + (differences[0] * differences[1]));
