import {readFileSync} from 'fs';
import {getSeatIds} from "./lib";
const input: string = readFileSync('input.txt', 'utf-8');
const lines: string[] = input.trim().split(/\r?\n/);

const seatIds = getSeatIds(lines);

const maxSeatId = seatIds.reduce((a,b) => Math.max(a, b));

console.log('Result: ', maxSeatId);
