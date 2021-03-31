import {readFileSync} from 'fs';
import {countTotalOccupied, directions, equalSeatMaps, prepareSeatMap, Seat, SeatMap} from "./lib";
const input = readFileSync('input.txt', 'utf-8').trim();

const countAdjacentOccupied = (seatMap: SeatMap, seatPos: string) => {
    const [posX, posY] = seatPos.split(',');
    let occupied = 0;

    directions.forEach(dir => {
        if (seatMap.get(`${Number(posX) + dir[0]},${Number(posY) + dir[1]}`) === '#') occupied++;
    });

    return occupied;
}

const nextMapState = (seatMap: SeatMap): SeatMap => {
    const newMap = new Map<string, Seat>();
    seatMap.forEach((value, key) => {
        const occupied = countAdjacentOccupied(seatMap, key);
        if (value === 'L' && occupied === 0) {
            newMap.set(key, '#');
        } else if (value === '#' && occupied >= 4) {
            newMap.set(key, 'L');
        } else {
            newMap.set(key, value);
        }
    });
    return newMap;
};

const originalSeatMap = prepareSeatMap(input);

let seatMap = originalSeatMap;

while (true) {
    const newSeatMap = nextMapState(seatMap);

    if (equalSeatMaps(seatMap, newSeatMap)) {
        console.log('Result: ' + countTotalOccupied(newSeatMap));
        break;
    }

    seatMap = newSeatMap;
}
