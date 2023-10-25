import { Router } from 'express'
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController'
import { verifyToken } from '../controllers/authController'

const taskRouter = Router()

// Create a new task (requires authentication)
taskRouter.post('/create', verifyToken, createTask)

// Get all tasks (requires authentication)
taskRouter.post('/get', verifyToken, getAllTasks)

// Update a task (requires authentication)
taskRouter.post('/update', verifyToken, updateTask)

// Delete a task (requires authentication)
taskRouter.delete('/delete', verifyToken, deleteTask)

export default taskRouter
