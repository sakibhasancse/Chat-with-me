import express from 'express'
import { Private } from '../../middleware/auth.middleware.js'
import { getMessages, addMessage } from './message.controller.js'

const router = express.Router()

router.route('/')
  .get(Private, getMessages)
  .post(Private, addMessage)

export default router
