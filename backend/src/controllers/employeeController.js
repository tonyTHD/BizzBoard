const prisma = require('../config/db')

const createEmployee = async (req, res) => {
    try {
        const { name, email, phone, position, department, hireDate, status } = req.body
        const employee = await prisma.employee.create({
            data: { name, email, phone, position, department, hireDate: new Date(hireDate), status }
        })
        res.status(201).json(employee)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create employee' })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()
        res.json(employees)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(req.params.id) }
        })
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json(employee)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee' })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = await prisma.employee.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        })
        res.json(employee)
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update employee' })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        await prisma.employee.delete({
            where: { id: parseInt(req.params.id) }
        })
        res.json({ message: 'Employee deleted' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' })
    }
}

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee }
