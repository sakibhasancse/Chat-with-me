import express from 'express'
import { Private } from '../../middleware/auth.middleware.js'
import { createChat, GetChats } from './chat.controller.js'

const router = express.Router()

router.route('/')
  .get(Private, GetChats)
  .post(Private, createChat)

export default router
