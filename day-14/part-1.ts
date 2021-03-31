import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);

const memory = new Map<number, number>();
let mask = new Array(36).fill('X');

for (const line of input) {
    if (line.startsWith('mask')) {
        mask = line.split('=')[1].trim().split('');
        continue;
    }

    const parts = line.replace(/^mem\[(\d+)\] = (\d+)$/, '$1,$2').split(',');
    const address: number = Number(parts[0]);
    const value: string = Number(parts[1]).toString(2).padStart(36, '0');

    const finalValue = parseInt(
        value.split('').map((bit, i) => mask[i] === 'X' ? bit : mask[i]).join('')
    , 2);

    memory.set(address, finalValue);
}

const sum = [...memory.values()].reduce((acc, cur) => {
    return acc + cur;
});

console.log('Result: ' + sum);

