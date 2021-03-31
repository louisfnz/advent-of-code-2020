import {readFileSync} from 'fs';
import {CompassInstruction, Position, processInstructions} from "./lib";
const input = readFileSync('input.txt', 'utf-8').trim();

const moveWaypoint = (waypointPosition: Position, compassDirection: CompassInstruction, value: number): Position => {
    const position = [...waypointPosition];
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

const rotateWaypoint = (waypointPosition: Position, action: string): Position => {
    let newPosition = waypointPosition;
    switch (action) {
        case 'R90':
        case 'L270':
            newPosition = [waypointPosition[1], waypointPosition[0] * -1];
            break;
        case 'R180':
        case 'L180':
            newPosition = [waypointPosition[0] * -1, waypointPosition[1] * -1];
            break;
        case 'R270':
        case 'L90':
            newPosition = [waypointPosition[1] * -1, waypointPosition[0]];
            break;
    }
    return newPosition;
};

const instructions = processInstructions(input);

let waypointPosition: Position = [10, 1];
let shipPosition: Position = [0, 0];

for (const instruction of instructions) {
    switch (instruction.action) {
        case 'N':
        case 'E':
        case 'S':
        case 'W':
            waypointPosition = moveWaypoint(waypointPosition, instruction.action, instruction.value);
            break;
        case 'F':
            shipPosition = [shipPosition[0] + (waypointPosition[0] * instruction.value), shipPosition[1] + (waypointPosition[1] * instruction.value)];
            break;
        case 'L':
        case 'R':
            waypointPosition = rotateWaypoint(waypointPosition, `${instruction.action}${instruction.value}`);
            break;
    }
}

console.log('Result: ' + (Math.abs(shipPosition[0]) + Math.abs(shipPosition[1])));
