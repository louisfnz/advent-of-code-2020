import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);

const rangeArray = (start: number, stop: number) =>
    Array.from({ length: (stop - start) + 1}, (_, i) => start + i);

const fieldValues = input.reduce<Map<string, Set<number>>>((tickets, line) => {
    if (line.match(/^[^:]+: [^:]+/)) {
        let split = line.split(':');
        const field = split[0].trim();
        const ranges = split[1].split('or').map(v => v.trim());

        const ticketSet = new Set<number>();

        ranges.forEach(range => {
            const [start, stop] = range.split('-').map(Number);
            rangeArray(start, stop).forEach(v => ticketSet.add(v));
        });

        tickets.set(field, ticketSet);
    }
    return tickets;
}, new Map<string, Set<number>>());

const validValues = new Set<number>();
fieldValues.forEach((value) => value.forEach(validValues.add, validValues));

const nearbyTicketsLine = input.indexOf('nearby tickets:');

const validTickets = input.slice(nearbyTicketsLine+1).reduce<number[][]>((tickets, line) => {
    const ticketValues = line.split(',').map(Number);
    let valid = true;
    for (const ticketValue of ticketValues) {
        if (!validValues.has(ticketValue)) {
            valid = false;
            break;
        }
    }
    if (valid) tickets.push(ticketValues);
    return tickets;
}, []);

const positionPossibilities = new Map<number, string[]>();

validTickets[0].forEach((_, i) => {
    positionPossibilities.set(i+1, [...fieldValues.keys()]);
});

validTickets.forEach((ticket) => {
    ticket.forEach(value => {

    });
});

// console.log('Result: ' + result);
