import express from 'express'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { createCategory, GetCategories } from './category.controller.js'


const router = express.Router()

router.route('/')
  .get(checkAuth, GetCategories)
  .post(createCategory)

export default router
