import { Request, Response } from "express"
import db from "../config/db"

export const createTask = async (req: Request, res: Response) => {
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
}

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await db.task.findMany({
        where: {
            status: false
        }
    })
    return res.status(200).json({ tasks })
}

export const completeTask = async (req: Request, res: Response) => {
    let task = await db.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
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
    return res.status(404).json({ message: "Task not found" })
}

export const updateTask = async (req: Request, res: Response) => {
    let task = await db.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    if (task !== undefined) {
        task = await db.task.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                dueDate: req.body.dueDate
            }
        })
        return res.status(200).json({ task })
    }
    return res.status(404).json({ message: "Task not found" })
}

export const deleteTask = async (req: Request, res: Response) => {
    let task = await db.task.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    if (task !== undefined) {
        task = await db.task.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.status(200).json({ task })
    }
    return res.status(404).json({ message: "Task not found" })
}