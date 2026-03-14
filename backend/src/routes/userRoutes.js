const express = require('express')
const router =express.Router()
const { getAllUsers, getUserById, createUser } = require('../controllers/userController')

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)

module.exports = router