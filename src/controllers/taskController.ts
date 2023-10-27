import { Request, Response } from 'express'
import Task, { ITask } from '../models/Task'
import { RequestWithUser } from './authController'
import User from '../models/User'
import Project from '../models/Project'

// Create a new task
export const createTask = async (req: RequestWithUser, res: Response) => {
  try {
    const { id, data } = req.body

    const newTask: ITask = new Task({ project: id, ...data })
    await newTask.save()

    await Project.findByIdAndUpdate(id, {
      $push: newTask.id
    })
    
    res.status(201).json({ ack: 1 })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ ack: 0, message: 'Task creation failed' })
  }
}

// Get all tasks
export const getAllTasks = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req.user
    const { id } = req.body

    // verify if project id belongs to current user, only then proceed
    const user = await User.findById(userId)
    if (user.projects.includes(id)) { 
      const tasks: ITask[] = await Task.find({
        project: id
      })
      res.status(200).json({ack: 1, tasks })
    } else {
      res.status(404).json({ ack: 0, message: 'Project not found' })
    }
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Failed to retrieve tasks' })
  }
}

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body
    const updatedTask: ITask | null = await Task.findByIdAndUpdate(
      id,
      data,
      { new: true }
    )
    if (!updatedTask) {
      return res.status(404).json({ ack: 0,message: 'Task not found' })
    }
    res.status(200).json({ack: 1 })
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Task update failed' })
  }
}

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id, projectId } = req.body
    const deletedTask: ITask | null = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).json({ ack: 0, message: 'Task not found' })
    }
    await Project.findByIdAndUpdate(projectId, {
      $pull: deletedTask.id
    })
    res.status(200).json({ack: 1})
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Task deletion failed' })
  }
}
