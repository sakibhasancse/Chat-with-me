import express from 'express'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { createChat, GetChats } from './chat.controller.js'

const router = express.Router()

router.route('/chat')
  .get(checkAuth, GetChats)
  .post(checkAuth, createChat)

export default router
