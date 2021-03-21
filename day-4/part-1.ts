import {readFileSync} from 'fs';
import {checkRequiredPassportFields, passportReducer} from "./lib";

const input: string = readFileSync('input.txt', 'utf-8');
const lines: string[] = input.trim().split(/\r?\n/);
const validPassports = lines.reduce(passportReducer, [{}]).filter(checkRequiredPassportFields);

console.log('Result: ' + validPassports.length);
