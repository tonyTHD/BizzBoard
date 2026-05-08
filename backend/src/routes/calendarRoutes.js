const express = require('express')
const router = express.Router()
const { createEvent, getEventsByUser, getEventById, updateEvent, deleteEvent } = require('../controllers/calendarController')

router.post('/', createEvent)
router.get('/user/:userId', getEventsByUser)
router.get('/:id', getEventById)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

module.exports = router
