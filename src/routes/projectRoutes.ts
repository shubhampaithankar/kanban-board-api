import { Router } from 'express'
import { createProject, getAllProjects, updateProject, deleteProject } from '../controllers/projectController'
import { verifyToken } from '../controllers/authController'

const projectRouter = Router()

// Create a new project (requires authentication)
projectRouter.post('/create', verifyToken, createProject)

// Get all projects (requires authentication)
projectRouter.get('/get', verifyToken, getAllProjects)

// Update a project (requires authentication)
projectRouter.post('/update', verifyToken, updateProject)

// Delete a project (requires authentication)
projectRouter.delete('/delete', verifyToken, deleteProject)

export default projectRouter
