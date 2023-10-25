import mongoose, { Document, Schema, Types } from 'mongoose'
import { ITask } from './Task'
import { IUser } from './User'

export interface IProject extends Document {
  name: string
  description: string
  tasks: Types.Array<ITask['_id']>
  owner: IUser['_id']
}

const projectSchema: Schema<IProject> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Project = mongoose.model<IProject>('Project', projectSchema)

export default Project
