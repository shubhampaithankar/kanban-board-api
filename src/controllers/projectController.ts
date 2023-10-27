import { Request, Response } from 'express'
import Project, { IProject } from '../models/Project'
import { RequestWithUser } from './authController'
import User from '../models/User'

// Create a new project
export const createProject = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req.user
    const newProject: IProject = new Project({ owner: userId, ...req.body })
    await newProject.save()

    // add id to user projects array
    await User.findByIdAndUpdate(userId, {
        $push: {
          projects: [newProject.id]
        }
    })

    res.status(201).json({ ack: 1 })
  } catch (error) {
    res.status(500).json({ ack: 0,message: 'Project creation failed' })
  }
}

// Get all projects
export const getAllProjects = async (req: RequestWithUser, res: Response) => {
  try {
    const projects: IProject[] = await Project.find({
      owner: req.user.userId
    })
    res.status(200).json({ack: 1, projects})
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Failed to retrieve projects' })
  }
}

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body
    const updatedProject: IProject | null = await Project.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )
    if (!updatedProject) {
      return res.status(404).json({ ack: 0, message: 'Project not found' })
    }
    res.status(200).json({ ack: 1, data: updatedProject })
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Project update failed' })
  }
}

// Delete a project
export const deleteProject = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.body
    const deletedProject: IProject | null = await Project.findByIdAndDelete(
      id
    )
    if (!deletedProject) {
      return res.status(404).json({ ack: 0, message: 'Project not found' })
    }
    // remove id from user projects array
    const { userId } = req.user
    await User.findByIdAndUpdate(userId, {
        $pull: {
          projects: [deletedProject.id]
        }
    })
    res.status(200).json({ ack: 1 })
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Project deletion failed' })
  }
}
