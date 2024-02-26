import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { completeTask, createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";

const app = Router()

app.post("", [
    body("name").exists().isString().notEmpty(),
    body("dueDate").exists()
], createTask)

app.get("", getTasks)

app.put("/completed/:id", completeTask)

app.put("/:id", [
    body("name").exists().isString().notEmpty(),
    body("dueDate").exists()
], updateTask)

app.delete("/:id", deleteTask)

export default app