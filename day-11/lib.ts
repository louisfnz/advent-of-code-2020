export type Seat = '.' | 'L' | '#';
export type SeatMap = Map<string, Seat>;

export const directions = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
];

export const prepareSeatMap = (input: string): SeatMap => {
    const seats = new Map<string, Seat>();

    const lines = input.trim().split(/\r?\n/);

    let y = 0;
    for (const line of lines) {
        let x = 0;
        for (const letter of line.split('')) {
            seats.set(`${x},${y}`, letter as Seat);
            x++;
        }
        y++;
    }

    return seats;
}

export const countTotalOccupied = (seatMap: SeatMap) => {
    let occupied = 0;

    seatMap.forEach((value) => {
        if (value === '#') occupied++;
    });

    return occupied;
}

export const equalSeatMaps = (map1: SeatMap, map2: SeatMap) => {
    if (map1.size !== map2.size) return false;

    try {
        map1.forEach((value, key) => {
            const testValue = map2.get(key);
            if (testValue !== value) {
                throw new Error();
            }
        });
    } catch (err) {
        return false;
    }

    return true;
}

export const logMap = (seatMap: SeatMap) => {
    let line = '';
    let prevY = 0;
    seatMap.forEach((value, key) => {
        const [,y] = key.split(',');
        if (Number(y) !== prevY) {
            line = '';
        }
        prevY = Number(y);
        line += value;
    });
}
