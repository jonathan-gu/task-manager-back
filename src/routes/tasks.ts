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

export default app