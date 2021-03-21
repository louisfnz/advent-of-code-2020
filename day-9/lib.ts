export const hasPair = (searchArray: number[], target: number) => {
    for (let i = 0; i < searchArray.length; i++) {
        const match = searchArray.find((item, j) =>
            j !== i && target - searchArray[i] === item
        );
        if (match) return true;
    }
    return false;
};

export const findSet = (array: number[], start: number, target: number) => {
    let accumulator = 0;
    for (let i = start; i < array.length; i++) {
        accumulator += array[i];
        if (accumulator === target) return array.slice(start, i);
        if (accumulator > target) return false;
    }
    return false;
}
