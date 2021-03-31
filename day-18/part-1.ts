import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);


const parenthesisRegex = /\([^()]+\)/g;
const simpleExpressionRegex = /\d+\s[*+]\s\d+/;

const calculateSimpleExpression = (expr: string) => {
    let currentExpr = expr;
    while (currentExpr.match(simpleExpressionRegex)) {
        const calculation = currentExpr.match(simpleExpressionRegex);
        if (calculation && calculation.length) {
            const result = eval(calculation[0]);
            currentExpr = currentExpr.replace(calculation[0], result);
        }
    }
    return currentExpr.replace(/[()]+/g, '');
};

const calculateLine = (expr: string) => {
    let currentExpr = expr;
    while (currentExpr.match(parenthesisRegex)) {
        let calculations = currentExpr.match(parenthesisRegex);
        if (calculations && calculations.length) {
            calculations.forEach(calculation => {
                const result = calculateSimpleExpression(calculation);
                currentExpr = currentExpr.replace(calculation, result);
            });
        }
    }
    return Number(calculateSimpleExpression(currentExpr));
};

let total = 0;

input.forEach((expr, i) => {
    total += calculateLine(expr);
});

console.log('Result: ' + total);
