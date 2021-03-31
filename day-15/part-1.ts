import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(',').map(Number);

const memory = new Map<number, { times: number, turns: number[] }>();
let turn = 1;
let lastSpoken;

while (true) {
    let speakThisTurn;

    if (turn <= input.length) {
        speakThisTurn = input[turn-1];
        memory.set(speakThisTurn, { turns: [turn], times: 1 });
    } else {
        const lastSpokenMemory = memory.get(lastSpoken as number);
        if (lastSpokenMemory) {
            if (lastSpokenMemory.times === 1) {
                speakThisTurn = 0;
            } else {
                speakThisTurn = (turn - 1) - lastSpokenMemory.turns[lastSpokenMemory.turns.length-2];
            }
            const speakThisTurnMemory = memory.get(speakThisTurn);
            if (speakThisTurnMemory) {
                memory.set(speakThisTurn, {times: speakThisTurnMemory!.times + 1, turns: [...speakThisTurnMemory!.turns, turn]});
            } else {
                memory.set(speakThisTurn, {times: 1, turns: [turn]});
            }
        }
    }

    if (turn === 2020) {
        console.log('Result: ' + speakThisTurn);
        break;
    }

    lastSpoken = speakThisTurn;
    turn++;
}

