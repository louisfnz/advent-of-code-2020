import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim();

const adapters = input.split(/\r?\n/).map(Number).sort((n1: number, n2: number) => n1 - n2);

adapters.push(adapters[adapters.length - 1] + 3);

const cache = new Map<number, number>();
cache.set(0, 1);

for (let i = 0; i < adapters.length; i++) {
    cache.set(adapters[i], 0);

    [1,2,3].forEach(diff => {
        if (cache.has(adapters[i] - diff)) {
            cache.set(adapters[i], cache.get(adapters[i])! + cache.get(adapters[i] - diff)!);
        }
    });
}

console.log('Result: ' + cache.get(Math.max(...adapters)));
