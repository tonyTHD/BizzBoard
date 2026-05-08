const express = require('express')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./src/routes/userRoutes')
const financeRoutes = require('./src/routes/financeRoutes')
const clientRoutes = require('./src/routes/clientRoutes')
const employeeRoutes = require('./src/routes/employeeRoutes')
const taskRoutes = require('./src/routes/taskRoutes')
const notificationRoutes = require('./src/routes/notificationRoutes')
const calendarRoutes = require('./src/routes/calendarRoutes')

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())             
app.use(express.json())     
app.use('/api/users', userRoutes)
app.use('/api/finances', financeRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/calendar', calendarRoutes)

app.get('/', (req,res) => {
    res.send('BizzBoard API is running')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
