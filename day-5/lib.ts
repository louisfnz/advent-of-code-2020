const seatReducer = (value: [number, number], item: string) => {
    let nextValue = value;
    if (['F', 'L'].includes(item)) {
        nextValue = [value[0], Math.floor(value[1] - ((value[1] - value[0]) / 2))];
    }
    if (['B', 'R'].includes(item)) {
        nextValue = [value[0] + Math.ceil((value[1] - value[0]) / 2), value[1]];
    }
    return nextValue;
};

export const getSeatIds = (boardingPasses: string[]) => {
    return boardingPasses.map(item => {
        const boardingPass = item.trim().split('');
        const row = boardingPass.slice(0,7).reduce(seatReducer, [0,127])[0];
        const col = boardingPass.slice(7,10).reduce(seatReducer, [0,7])[0];
        return (row * 8) + col;
    });
}
