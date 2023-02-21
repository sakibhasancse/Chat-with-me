import express from 'express'
import { CategoryRouters, chatMessageRouters, chatRoutes, userRoutes, } from './modules/index.js'

const router = express.Router()

router.use('/api/auth', userRoutes)
router.use('/api/chat', chatRoutes)
router.use('/api/message', chatMessageRouters)
router.use('/api/category', CategoryRouters)
router.use('/api', (req, res) =>
  res.status(200).json({ status: 'sucess', message: 'API is working' })
)
router.use('/', (req, res) =>
  res.status(404).json({ status: 'error', message: 'No API route found' })
)

export default router
