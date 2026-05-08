const prisma = require('../config/db')

const createClient = async (req, res) => {
    try {
        const { name, email, phone, company, status } = req.body
        const client = await prisma.client.create({
            data: { name, email, phone, company, status }
        })
        res.status(201).json(client)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create client' })
    }
}

const getAllClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany()
        res.json(clients)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch clients' })
    }
}

const getClientById = async (req, res) => {
    try {
        const client = await prisma.client.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (!client) return res.status(404).json({ error: 'Client not found' })
        res.json(client)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch client' })
    }
}

const updateClient = async (req, res) => {
    try {
        const client = await prisma.client.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        })
        res.json(client)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update client' })
    }
}

const deleteClient = async (req, res) => {
    try {
        await prisma.client.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Client deleted' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete client' })
    }
}

module.exports = { createClient, getAllClients, getClientById, updateClient, deleteClient }
