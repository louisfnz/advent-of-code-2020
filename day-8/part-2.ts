import {readFileSync} from 'fs';
import {parseProgram, runProgram} from "./lib";
const input: string = readFileSync('input.txt', 'utf-8');

const program = parseProgram(input.trim().split(/\r?\n/));

for (let i = 0; i < program.length; i++) {
    const line = program[i];
    if (line.op === 'acc') continue;

    const modifiedProgram = Array.from(program);

    modifiedProgram[i] = {
        op: line.op === 'jmp' ? 'nop' : 'jmp',
        val: line.val
    };

    const result = runProgram(modifiedProgram);

    if (result[1] === modifiedProgram.length) {
        console.log('Result: ' + result[0]);
        break;
    }
}
