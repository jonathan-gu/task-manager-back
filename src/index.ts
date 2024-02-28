import express, { Express } from "express"
import cors from "cors"
import task from "./routes/taskRoute";

const port = 8080

const app: Express = express()

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json())

app.use("/tasks", [ 
    task
])

app.listen(port)