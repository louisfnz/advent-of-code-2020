import {readFileSync} from 'fs';
import {countTotalOccupied, directions, equalSeatMaps, prepareSeatMap, Seat, SeatMap} from "./lib";
const input = readFileSync('input.txt', 'utf-8').trim();

const countVisibleOccupied = (seatMap: SeatMap, seatPos: string) => {
    const [posX, posY] = seatPos.split(',');
    let occupied = 0;

    directions.forEach(dir => {
        let nextPos = [Number(posX) + dir[0], Number(posY) + dir[1]];

        while (true) {
            const seat = seatMap.get(`${nextPos[0]},${nextPos[1]}`);
            if (seat !== '.') {
                if (seat === '#') occupied++;
                break;
            }
            nextPos = [nextPos[0] + dir[0], nextPos[1] + dir[1]];
        }
    });

    return occupied;
}

const nextMapState = (seatMap: SeatMap): SeatMap => {
    const newMap = new Map<string, Seat>();
    seatMap.forEach((value, key) => {
        const occupied = countVisibleOccupied(seatMap, key);
        if (value === 'L' && occupied === 0) {
            newMap.set(key, '#');
        } else if (value === '#' && occupied >= 5) {
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
