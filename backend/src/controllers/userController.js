const prisma = require('../config/db')

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await prisma.user.create({
            data: { name, email, password }
        })
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' })
    }
}

const getAllUsers =async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (!user) return res.status(404).json({ error: 'User not found'})
        res.json(user)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}

module.exports = { getAllUsers, getUserById, createUser }