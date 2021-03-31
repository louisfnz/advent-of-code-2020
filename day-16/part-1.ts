import {readFileSync} from 'fs';
const input = readFileSync('test-input.txt', 'utf-8').trim().split(/\r?\n/);

const rangeArray = (start: number, stop: number) =>
    Array.from({ length: (stop - start) + 1}, (_, i) => start + i);

const fieldValues = input.reduce<Set<number>>((tickets, line) => {
    if (line.match(/^[^:]+: [^:]+/)) {
        const ranges = line.split(':')[1].split('or').map(v => v.trim());
        ranges.forEach(range => {
            const [start, stop] = range.split('-').map(Number);
            rangeArray(start, stop).forEach(v => tickets.add(v));
        });
    }
    return tickets;
}, new Set<number>());

const nearbyTicketsLine = input.indexOf('nearby tickets:');

const result = input.slice(nearbyTicketsLine+1).join(',').split(',')
    .reduce<number>((errorRate, ticket) => {
        const ticketNo = Number(ticket);
        if (!fieldValues.has(ticketNo)) errorRate += ticketNo;
        return errorRate;
}, 0);


console.log('Result: ' + result);