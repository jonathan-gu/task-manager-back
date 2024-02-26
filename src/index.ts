import express, { Express, Request, Response } from "express"
import task from "./routes/taskRoute";

const port = 8080

const app: Express = express()

app.use(express.json())

app.use("/tasks", [ 
    task
])

app.listen(port)