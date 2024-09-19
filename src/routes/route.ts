import express from "express";
import nginxRouter from "./nginx/route";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
    res.send("Hello World!");
});

mainRouter.use("/nginx", nginxRouter);

export default mainRouter;