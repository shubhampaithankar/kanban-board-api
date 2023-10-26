import { Request, Response } from 'express'
import Task, { ITask } from '../models/Task'

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, labels, priority, project } = req.body
    const newTask: ITask = new Task({
      title,
      description,
      status,
      labels,
      priority,
      project,
    })
    await newTask.save()
    res.status(201).json({ ack: 1 })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Task creation failed' })
  }
}

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const tasks: ITask[] = await Task.find({
      project: id
    })
    res.status(200).json({ack: 1, tasks })
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
      return res.status(404).json({ ack: 1,message: 'Task not found' })
    }
    res.status(200).json({ack: 1 })
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Task update failed' })
  }
}

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const deletedTask: ITask | null = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).json({ ack: 1, message: 'Task not found' })
    }
    res.status(200).json(deletedTask)
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Task deletion failed' })
  }
}
