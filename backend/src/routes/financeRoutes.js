const express = require('express')
const router = express.Router()
const { createFinance, getAllFinances, getFinanceById, updateFinance, deleteFinance } = require('../controllers/financeController')

router.post('/', createFinance)
router.get('/', getAllFinances)
router.get('/:id', getFinanceById)
router.put('/:id', updateFinance)
router.delete('/:id', deleteFinance)

module.exports = router
