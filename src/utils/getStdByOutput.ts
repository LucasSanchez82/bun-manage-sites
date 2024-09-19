import type { ShellOutput } from "bun";

export const getStdByOutput = (output: ShellOutput) => {
    const stdout = output.stdout.toString();
    const stderr = output.stderr.toString();
    return { stdout, stderr };
}
