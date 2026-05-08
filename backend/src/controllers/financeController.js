const prisma = require('../config/db')

const createFinance = async (req, res) => {
    try {
        const { title, amount, type, category, description, date } = req.body
        const finance = await prisma.finance.create({
            data: { title, amount, type, category, description, date: new Date(date) }
        })
        res.status(201).json(finance)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create finance record' })
    }
}

const getAllFinances = async (req, res) => {
    try {
        const finances = await prisma.finance.findMany()
        res.json(finances)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch finance records' })
    }
}

const getFinanceById = async (req, res) => {
    try {
        const finance = await prisma.finance.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (!finance) return res.status(404).json({ error: 'Finance record not found' })
        res.json(finance)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch finance record' })
    }
}

const updateFinance = async (req, res) => {
    try {
        const finance = await prisma.finance.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        })
        res.json(finance)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update finance record' })
    }
}

const deleteFinance = async (req, res) => {
    try {
        await prisma.finance.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Finance record deleted' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete finance record' })
    }
}

module.exports = { createFinance, getAllFinances, getFinanceById, updateFinance, deleteFinance }
