import { Router, Request, Response } from "express";
import { body } from "express-validator";
import db from "../db";

const app = Router()

app.post("", [
    body("name").exists().isString().notEmpty(),
    body("dueDate").exists()
], async (req: Request, res: Response) => {
    try {
        const task = await db.task.create({
            data: {
                name: req.body.name,
                dueDate: req.body.dueDate,
                status: false
            }
        })
        return res.status(201).json({ task })
    } catch (exception) {
        return res.status(400).json({ error: exception?.toString() })
    }
})

app.get("", async (req: Request, res: Response) => {
    const tasks = await db.task.findMany({})
    return res.status(200).json({ tasks })
})

app.put("/completed/:id", async (req: Request, res: Response) => {
    let task = await db.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    console.log(task)
    if (task !== undefined) {
        task = await db.task.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                "status": true
            }
        })
        return res.status(200).json({ task })
    }
    return res.status(404).json({ message: "Task not found " })
})

export default app