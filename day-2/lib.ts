export const processEntry = (entry: string) => {
    const params = entry.split(' ');
    const positions = params[0].trim().split('-').map(Number);
    const letter = params[1].trim().replace(':', '');
    const password = params[2].trim();
    return {
        positions,
        letter,
        password
    };
};
