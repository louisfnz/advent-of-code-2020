import {readFileSync} from 'fs';
import {getSeatIds} from "./lib";
const input: string = readFileSync('input.txt', 'utf-8');
const lines: string[] = input.trim().split(/\r?\n/);

const seatIds = getSeatIds(lines).sort((n1, n2) => n1 - n2);

let lastSeat: number | null = null;
let mySeat;

for (const seat of seatIds) {
    if (lastSeat && lastSeat + 1 !== seat) {
        mySeat = lastSeat + 1;
        break;
    }
    lastSeat = seat;
}

console.log('Result: ', mySeat);
