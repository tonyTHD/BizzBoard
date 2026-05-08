const prisma = require('../config/db')

const createEvent = async (req, res) => {
    try {
        const { title, description, startDate, endDate, userId } = req.body
        const event = await prisma.calendarEvent.create({
            data: { title, description, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, userId }
        })
        res.status(201).json(event)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create event' })
    }
}

const getEventsByUser = async (req, res) => {
    try {
        const events = await prisma.calendarEvent.findMany({
            where: { userId: parseInt(req.params.userId) }
        })
        res.json(events)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' })
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await prisma.calendarEvent.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (!event) return res.status(404).json({ error: 'Event not found' })
        res.json(event)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' })
    }
}

const updateEvent = async (req, res) => {
    try {
        const event = await prisma.calendarEvent.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        })
        res.json(event)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update event' })
    }
}

const deleteEvent = async (req, res) => {
    try {
        await prisma.calendarEvent.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Event deleted' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete event' })
    }
}

module.exports = { createEvent, getEventsByUser, getEventById, updateEvent, deleteEvent }
