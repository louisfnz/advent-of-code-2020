

export type Position = [number, number];
export type TurnInstruction = 'L' | 'R';
export type CompassInstruction = 'N' |'S' |'E' |'W';
export type CompassDegrees = 0 | 90 | 180 | 270;
export type Instruction = {
    action: TurnInstruction & CompassInstruction & 'F',
    value: number
};


export const compass: Record<CompassDegrees, CompassInstruction> = {
    0: 'N',
    90: 'E',
    180: 'S',
    270: 'W'
};

export const processInstructions = (input: string) => input.split(/\r?\n/).map((instr): Instruction => {
    const action = instr.substr(0, 1) as Instruction['action'];
    const value = Number(instr.substr(1));
    return {action, value};
});
