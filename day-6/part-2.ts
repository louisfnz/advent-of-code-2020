import {readFileSync} from 'fs';
const input: string = readFileSync('input.txt', 'utf-8');
const groups: string[] = input.trim().split(/\r?\n\r?\n/);

const counts = groups.map(group => {
    const groupAnswers = group.trim().split(/\r?\n/).map(item => item.split(''));
    return groupAnswers.reduce((answers, current) =>
        answers.filter(item => current.includes(item))
    ).length;
});

const answerSum = counts.reduce((acc, cur) => acc + cur);

console.log('Result: ' + answerSum);
