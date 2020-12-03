export const findTwo = (entries: number[], target: number): [number, number] | void => {
    for (let i = 0; i < entries.length; i++) {
        const targetIndex = entries.indexOf(target - entries[i]);
        if (targetIndex > -1) {
            return [entries[i], entries[targetIndex]];
        }
    }
}

export const findThree = (entries: number[], target: number): [number, number, number] | void => {
    for (let i = 0; i < entries.length; i++) {
        const two = findTwo(entries, target - entries[i]);
        if (two && two[0] !== two[1] && !two.includes(entries[i])) {
            return [...two, entries[i]];
        }
    }
}
