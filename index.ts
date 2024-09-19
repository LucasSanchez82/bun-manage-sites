import express from "express";
import mainRouter from "./src/routes/route";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`) 
    })
    next()
})

app.use('/', mainRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
