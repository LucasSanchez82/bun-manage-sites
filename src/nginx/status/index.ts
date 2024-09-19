import type { RequestHandler } from "express";
import { $, type ShellOutput } from "bun";
import handleError from "../../utils/handleError";
import { postNginxStatusSchema } from "./schema";
import { sudoStr } from "../../utils/sudo";

const getNginxStatus: RequestHandler = async (req, res) => {
    let output: ShellOutput;
    let status: string = 'unknown'
    
    try {
        output = await $`echo ${process.env.SUDO_PASSWORD} | sudo -S service nginx status`;
        const stdout = output.stdout
        const stderr = output.stderr
        if (stdout.includes("is running")) {
            status = 'running';
        }else if (stdout.includes("is not running")) {
            status = 'not running';
        }
        res.json({ status, error: stderr.toString() || undefined });
    } catch(e) {
        handleError(e, (error) => {
            res.json({error: error.message}).status(500)
        })
    }
};

const postNginxStatus: RequestHandler = async (req, res) => {
    const body = req.body
    const parsedBody = postNginxStatusSchema.safeParse(body)
    if (parsedBody.success) {
        const output = await $`echo ${process.env.SUDO_PASSWORD} | sudo -S service nginx ${parsedBody.data.status}`;
        const stdout = output.stdout
        const stderr = output.stderr
        res.json({status: stdout.toString(), error: stderr.toString() || undefined})
    }else{
        res.json({error: JSON.parse(parsedBody.error.message)}).status(400)
    }    
}

export {getNginxStatus, postNginxStatus};