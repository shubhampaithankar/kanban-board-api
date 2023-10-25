import { Router } from 'express'
import { register, login } from '../controllers/authController'

const authRouter = Router()

// Route for user registration
authRouter.post('/register', register)

// Route for user login
authRouter.post('/login', login)


export default authRouter
