export type Slope = [number, number];

export const adjustRowLength = (row: string, index: number, slope: Slope): string => {
    const requiredRowLength = index === 0 ? slope[0] : Math.ceil(((index * slope[0]) + 1) / slope[1]);
    if (row.length < requiredRowLength) {
        const duplicates = Math.ceil(requiredRowLength / row.length);
        let newRow = '';
        for (let i = 0; i < duplicates; i++) {
            newRow = newRow + row;
        }
        return newRow;
    }
    return row;
};

export const countTrees = (rows: string[], slope: Slope): number => {
    let trees = 0;
    for (let i = slope[1]; i < rows.length; i += slope[1]) {
        const rowIndex = ((slope[0] * (i + 1)) - slope[0]) / slope[1];
        if (rows[i][rowIndex] === '#') trees++;
    }
    return trees;
}
