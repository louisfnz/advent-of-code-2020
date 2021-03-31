import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);

type Result = {
    wait: number | null,
    id: number | null
}

const busIds = input[1].split(',').reduce((total: number[], id) => {
    if (id !== 'x') total.push(Number(id));
    return total;
}, []);

const timestamp = Number(input[0]);

const result: Result = {wait: null, id: null};

let checkTimestamp = timestamp;

while (true) {
    for (const id of busIds) {
        const match = checkTimestamp % id;
        if (match === 0) {
            result.wait = checkTimestamp - timestamp;
            result.id = id;
            break;
        }
    }
    if (result.wait && result.id) break;
    checkTimestamp++;
}

console.log('Result: ' + (result.id * result.wait));
