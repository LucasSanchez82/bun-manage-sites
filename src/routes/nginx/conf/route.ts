import { Router } from "express";
import getNginxConf from "../../../nginx/conf";

const nginxConfRouter = Router()

nginxConfRouter.get("/", (req, res) => res.send('get : \n /enabled\n/available\n/all'));
nginxConfRouter.get('/available', getNginxConf.available)
nginxConfRouter.get('/enabled', getNginxConf.enabled)
nginxConfRouter.get('/all', getNginxConf.all)
nginxConfRouter.get('/status', getNginxConf.status)

export default nginxConfRouter;