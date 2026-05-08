const prisma = require('../config/db')

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, assignedToId } = req.body
        const task = await prisma.task.create({
            data: { title, description, status, priority, dueDate: dueDate ? new Date(dueDate) : null, assignedToId }
        })
        res.status(201).json(task)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create task' })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            include: { assignedTo: true }
        })
        res.json(tasks)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { assignedTo: true }
        })
        if (!task) return res.status(404).json({ error: 'Task not found' })
        res.json(task)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch task' })
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        })
        res.json(task)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update task' })
    }
}

const deleteTask = async (req, res) => {
    try {
        await prisma.task.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Task deleted' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete task' })
    }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask }
