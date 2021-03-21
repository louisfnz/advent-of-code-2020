import {readFileSync} from 'fs';
import {parseProgram, runProgram} from "./lib";
const input: string = readFileSync('input.txt', 'utf-8');

const program = parseProgram(input.trim().split(/\r?\n/));
const result = runProgram(program);

console.log('Result: ' + result[0]);
