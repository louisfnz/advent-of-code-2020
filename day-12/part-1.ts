import {readFileSync} from 'fs';
import {compass, CompassDegrees, CompassInstruction, Position, processInstructions, TurnInstruction} from "./lib";
const input = readFileSync('input.txt', 'utf-8').trim();

const move = (currentPosition: Position, compassDirection: CompassInstruction, value: number): Position => {
    const position = [...currentPosition];
    switch (compassDirection) {
        case 'N':
            position[1] += value;
            break;
        case 'E':
            position[0] += value;
            break;
        case 'S':
            position[1] -= value;
            break;
        case 'W':
            position[0] -= value;
            break;
    }
    return position as Position;
};

const turn = (currentDegrees: CompassDegrees, direction: TurnInstruction, value: number): CompassDegrees => {
    currentDegrees += direction === 'L' ? value * -1 : value;
    if (currentDegrees < 0) currentDegrees += 360;
    if (currentDegrees >= 360) currentDegrees -= 360;
    return currentDegrees as CompassDegrees;
};

const instructions = processInstructions(input);

let currentPosition: Position = [0,0];
let currentDegrees = 90;

for (const instruction of instructions) {
    switch (instruction.action) {
        case 'N':
        case 'E':
        case 'S':
        case 'W':
            currentPosition = move(currentPosition, instruction.action, instruction.value);
            break;
        case 'F':
            const direction = compass[currentDegrees as CompassDegrees];
            currentPosition = move(currentPosition, direction, instruction.value);
            break;
        case 'L':
        case 'R':
            currentDegrees = turn(currentDegrees as CompassDegrees, instruction.action, instruction.value);
            break;
    }
}

console.log('Result: ' + (Math.abs(currentPosition[0]) + Math.abs(currentPosition[1])));
