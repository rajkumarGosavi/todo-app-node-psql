const express = require('express')
const { rootHandler, getTasks, createTask,
    updateTask, deleteTask, getTaskMetrics } = require('../handlers')

const router = express.Router()

router.get('/', rootHandler)
router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)
router.get('/tasks/metric', getTaskMetrics)

module.exports = router
