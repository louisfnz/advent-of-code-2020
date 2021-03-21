export type Instruction = {
    op: 'acc' | 'jmp' | 'nop',
    val: number
}

export const parseProgram = (program: string[]): Instruction[] =>
    program.map(line => {
        const code = line.split(' ');
        return {op: code[0] as Instruction['op'], val: Number(code[1])};
    });

export const runProgram = (program: Instruction[]) => {
    const executed = new Set<number>();
    let accumulator = 0;
    let index = 0;

    while (!executed.has(index) && index < program.length) {
        const line = program[index];

        executed.add(index);

        switch (line.op) {
            case 'acc':
                accumulator += line.val;
                index++;
                break;
            case 'jmp':
                index = index + line.val;
                break;
            default:
                index++;
        }
    }

    return [accumulator, index];
};
