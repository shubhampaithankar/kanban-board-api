import mongoose, { Document, Schema, Types } from 'mongoose'
import { IProject } from './Project'

export interface IUser extends Document {
  username: string
  password: string
  email: string
  dob: Date
  region: string
  projects: Types.Array<IProject['_id']>
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
