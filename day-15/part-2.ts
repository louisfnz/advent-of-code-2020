import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(',').map(Number);

const memory = new Map<number, number>();
input.forEach((number, turn) => {
    memory.set(number, turn + 1);
});


let turn = memory.size + 1;
let lastSpoken = [...memory.keys()].pop()!;

while (turn <= 30000000) {
    let speakThisTurn;

    const lastSpokenMemory = memory.get(lastSpoken as number);

    memory.set(lastSpoken as number, turn - 1);

    if (lastSpokenMemory) {
        speakThisTurn = turn - 1 - lastSpokenMemory;
    } else {
        speakThisTurn = 0;
    }

    lastSpoken = speakThisTurn;
    turn++;
}

console.log('Result: ' + lastSpoken);

