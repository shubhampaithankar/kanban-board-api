import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
  title: string
  description: string
  status: string
  labels: string[]
  priority: string
  project: mongoose.Types.ObjectId
}

const taskSchema: Schema<ITask> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  labels: [{
    type: String,
  }],
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  
})

const Task = mongoose.model<ITask>('Task', taskSchema)

export default Task
