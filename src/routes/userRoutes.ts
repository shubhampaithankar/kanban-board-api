import { Router } from 'express'
import { verifyToken } from '../controllers/authController'
import { getUserDetails, updateUser } from '../controllers/userController'

const userRouter = Router()

//Get user details (requires authentication)
userRouter.get('/get-user', verifyToken, getUserDetails)

// Update user details (requires authentication)
userRouter.post('/update', verifyToken, updateUser)

export default userRouter