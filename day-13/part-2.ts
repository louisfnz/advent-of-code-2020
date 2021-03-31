import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);

function lowestCommonMultiple(n1: number, n2: number): number {
    if ([n1, n2].includes(0)) return 0;
    return Math.abs((n1 * n2) / greatestCommonDiviser(n1, n2));
}

function greatestCommonDiviser(n1: number, n2: number): number {
    if (!n2) return Math.abs(n1);
    return greatestCommonDiviser(n2, n1 % n2);
}

const busIds = input[1].split(",").map((busId) =>
    busId === "x" ? 1 : Number(busId)
);

let timestamp = 0;
let step = busIds[0];

for (let i = 0; i < busIds.length; i++) {
    if (busIds[i] === 1 || busIds[i] === step) continue;

    while ((timestamp + i) % busIds[i] !== 0) {
        timestamp += step;
    }

    step = lowestCommonMultiple(step, busIds[i]);
}

console.log('Result: ' + timestamp);
