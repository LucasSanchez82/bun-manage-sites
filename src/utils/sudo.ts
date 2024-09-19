import { $, ShellPromise, type Shell } from "bun";

const sudoStr = (command: string) => $`echo ${process.env.SUDO_PASSWORD} | sudo -S ${command}`;

export { sudoStr };