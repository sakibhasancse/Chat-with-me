import express from 'express'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { getMessages, addMessage } from './message.controller.js'

const router = express.Router()

router.route('/message')
  .get(checkAuth, getMessages)
  .post(checkAuth, addMessage)

export default router
