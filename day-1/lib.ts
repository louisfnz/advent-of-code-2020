export const findTwo = (entries: number[], target: number): [number, number] | void => {
    for (const entry of entries) {
        const targetIndex = entries.indexOf(target - entry);
        if (targetIndex > -1) {
            return [entry, entries[targetIndex]];
        }
    }
}

export const findThree = (entries: number[], target: number): [number, number, number] | void => {
    for (const entry of entries) {
        const two = findTwo(entries, target - entry);
        if (two && two[0] !== two[1] && !two.includes(entry)) {
            return [...two, entry];
        }
    }
}
