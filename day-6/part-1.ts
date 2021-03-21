import {readFileSync} from 'fs';
const input: string = readFileSync('input.txt', 'utf-8');
const groups: string[] = input.trim().split(/\r?\n\r?\n/);

const counts = groups.map(group => {
    const answers = group.trim().replace(/[^a-z]/g, '').split('');
    const uniqueAnswers = answers.filter((value, i, self) => {
        return self.indexOf(value) === i;
    });
    return uniqueAnswers.length;
});

const answerSum = counts.reduce((acc, cur) => acc + cur);

console.log('Result: ', answerSum);
