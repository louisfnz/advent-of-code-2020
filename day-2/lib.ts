export type PasswordObject = {
    positions: [number, number],
    letter: string,
    password: string
};

export const processEntry = (entry: string): PasswordObject => {
    const params = entry.split(' ');
    const tempPositions = params[0].trim().split('-').map(Number);
    return {
        positions: [tempPositions[0], tempPositions[1]],
        letter: params[1].trim().replace(':', ''),
        password: params[2].trim()
    };
};
