import { Router } from 'express'
import authRouter from './authRoutes'
import projectRouter from './projectRoutes'
import taskRouter from './taskRoutes'
import userRouter from './userRoutes'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/projects', projectRouter)
router.use('/tasks', taskRouter)

export default router