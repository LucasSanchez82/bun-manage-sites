import { sudoStr } from "../src/utils/sudo";
import { expect, test } from "bun:test";

test('sudoStr', () => {
    console.log(process.env.SUDO_PASSWORD);
    expect(sudoStr('ls')).toBe(`echo ${process.env.SUDO_PASSWORD} | sudo -S ls`)
})