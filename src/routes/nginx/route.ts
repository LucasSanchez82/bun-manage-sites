import express from "express";
import { $ } from "bun";
import { getNginxStatus, postNginxStatus } from "../../nginx/status";
import nginxConfRouter from "./conf/route";

const nginxRouter = express.Router();

nginxRouter.get("/", (req, res) => {
    res.send("Hello World!\n");
});

nginxRouter.use("/conf", nginxConfRouter);

nginxRouter.get("/status", getNginxStatus);
nginxRouter.post('/status', postNginxStatus);

export default nginxRouter;