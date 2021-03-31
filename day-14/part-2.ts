import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);

const memory = new Map<number, number>();
let mask = new Array(36).fill('0');

const allMemoryAddresses = (inputAddress: string): string[] => {
    const address = inputAddress.split('');

    const i = address.indexOf("X");

    if (i === -1) return [address.join('')];

    address[i] = '1';
    const variantsWith1 = allMemoryAddresses(address.join(''));

    address[i] = '0';
    const variantsWith0 = allMemoryAddresses(address.join(''));

    return [...variantsWith1, ...variantsWith0];
}

for (const line of input) {
    if (line.startsWith('mask')) {
        mask = line.split('=')[1].trim().split('');
        continue;
    }

    const parts = line.replace(/^mem\[(\d+)\] = (\d+)$/, '$1,$2').split(',');
    const address: string = Number(parts[0]).toString(2).padStart(36, '0');
    const value: number = Number(parts[1]);

    const finalAddress = address.split('')
        .map((bit, i) => mask[i] === '0' ? bit : mask[i])
        .join('');

    const addresses = allMemoryAddresses(finalAddress);

    addresses.forEach(address => {
        memory.set(parseInt(address, 2), value);
    });
}

const sum = [...memory.values()].reduce((acc, cur) => {
    return acc + cur;
});

console.log('Result: ' + sum);

