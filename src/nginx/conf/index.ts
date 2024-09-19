import { $ } from "bun";
import { type RequestHandler } from "express";
import { getStdByOutput } from "../../utils/getStdByOutput";


const getAvailable = async () => {
    const output = await $`echo ${process.env.SUDO_PASSWORD} | sudo -S ls /etc/nginx/sites-available`;
    return getStdByOutput(output);
}

const getEnabled = async () => {
    const output = await $`echo ${process.env.SUDO_PASSWORD} | sudo -S ls /etc/nginx/sites-enabled`;
    return getStdByOutput(output);
}

const available: RequestHandler = async (req, res) => {
    const { stdout, stderr } = await getAvailable();
    res.json({ domains: stdout.trim().split('\n'), error: stderr || undefined });
}

const enabled: RequestHandler = async (req, res) => {
    const { stdout, stderr } = await getEnabled();
    res.json({ domains: stdout.trim().split('\n'), error: stderr || undefined });
}

const all: RequestHandler = async (req, res) => {
    const { stdout: stdoutAvailable, stderr: stderrAvailable } = await getAvailable();
    const { stdout: stdoutEnabled, stderr: stderrEnabled } = await getEnabled();
    res.json({ domains: {available: stdoutAvailable.trim().split('\n'), enabled: stdoutEnabled.trim().split('\n')}, error: stderrAvailable || stderrEnabled || undefined });
}

const getNginxConf = { available, enabled, all } 

export default getNginxConf;