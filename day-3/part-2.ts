import {readFileSync} from 'fs';
import {adjustRowLength, countTrees, Slope} from "./lib";

const slopes: Slope[] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];
const input: string = readFileSync('input.txt', 'utf-8');
const rows: string[] = input.trim().split('\n').map(row => row.trim());

let treesProduct = 0;

slopes.forEach((slope, i) => {
    const slopeRows = rows.map((row, r) => adjustRowLength(row.trim(), r, slope));
    const trees = countTrees(slopeRows, slope);
    treesProduct = i === 0 ? trees : treesProduct *= trees;
});

console.log('Result: ' + treesProduct);
