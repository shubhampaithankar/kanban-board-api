import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User, { IUser } from '../models/User'

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, dob, region } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ ack: 0, message: 'User already exists' })
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: IUser = new User({
      username,
      password: hashedPassword, 
      email, dob, region
    })

    await newUser.save()
    res.status(201).json({ ack: 1, message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'User registration failed' })
  }
}

// Login and generate a JWT token
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    // Find the user by email
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ ack: 0, message: 'Invalid credentials' })
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ ack: 0, message: 'Invalid credentials' })
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({ ack: 1, token })
  } catch (error) {
    res.status(500).json({ ack: 0, message: 'Login failed' })
  }
}

// Middleware to verify JWT token
export const verifyToken = (req: RequestWithUser, res: Response, next?: NextFunction) => {
    try {
        const token = req.header('Authorization')

        if (!token) {
          return res.status(401).json({ ack: 2, message: 'Access denied. No token provided.' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ ack: 2, message: 'Invalid token.' })
    }
}
  
export interface RequestWithUser extends Request {
    user?: {
      userId: string
    }
}