import {readFileSync} from 'fs';
const input: string = readFileSync('input.txt', 'utf-8');
const rules: string[] = input.trim().split(/\r?\n/);

const getBagCount = (searchBag: string): number => {
    const rule = rules.find((item) => item.match(`${searchBag}s contain`));
    if (rule) {
        const foundBags = rule.split('contain ')[1].replace('.', '').split(',').map(item => item.trim());
        if (foundBags[0] !== 'no other bags') {
            return foundBags.reduce((total, item) => {
                const bag = item.substr(1).replace('bags', 'bag').trim();
                const count = Number(item[0]);
                const countWithin = getBagCount(bag);
                return total + (countWithin > 0 ? count + (count * countWithin) : count);
            }, 0);
        }
    }
    return 0;
}

const count = getBagCount('shiny gold bag');

console.log('Result: ' + count);
