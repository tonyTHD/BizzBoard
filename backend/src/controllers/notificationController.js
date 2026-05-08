const prisma = require('../config/db')

const createNotification = async (req, res) => {
    try {
        const { message, userId } = req.body
        const notification = await prisma.notification.create({
            data: { message, userId }
        })
        res.status(201).json(notification)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create notification' })
    }
}

const getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: parseInt(req.params.userId) }
        })
        res.json(notifications)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' })
    }
}

const markAsRead = async (req, res) => {
    try {
        const notification = await prisma.notification.update({
            where: { id: parseInt(req.params.id) },
            data: { read: true }
        })
        res.json(notification)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update notification' })
    }
}

const deleteNotification = async (req, res) => {
    try {
        await prisma.notification.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Notification deleted' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' })
    }
}

module.exports = { createNotification, getNotificationsByUser, markAsRead, deleteNotification }
