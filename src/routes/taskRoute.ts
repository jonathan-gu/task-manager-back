import { Router, Request, Response } from "express";
import { body } from "express-validator";
import db from "../config/db";
import { completeTask, createTask, getTasks } from "../controllers/taskController";

const app = Router()

app.post("", [
    body("name").exists().isString().notEmpty(),
    body("dueDate").exists(),
    createTask
])

app.get("", getTasks)

app.put("/completed/:id", completeTask)

export default app