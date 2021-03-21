import {readFileSync} from 'fs';
const input: string = readFileSync('input.txt', 'utf-8');
const rules: string[] = input.trim().split(/\r?\n/);

const validBags: string[] = [];
let searchBags = ['shiny gold bag'];

while (true) {
    searchBags = rules.reduce((acc: string[], rule) => {
        const searchContext = rule.split('contain')[1];
        searchBags.forEach(bag => {
            if (searchContext.match(bag)) {
                const newBag = rule.split('s contain')[0];
                if (validBags.indexOf(newBag) === -1) validBags.push(newBag);
                acc.push(newBag);
            }
        });
        return acc;
    }, []);

    if (!searchBags.length) break;
}

console.log('Result: ' + validBags.length);
