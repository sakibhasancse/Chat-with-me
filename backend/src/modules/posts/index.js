import express from 'express'
import { checkAuth, Private } from '../../middleware/auth.middleware.js'
import { getPost, getPosts, deletePost, createPost } from './post.controller.js'

const router = express.Router()

router.route('/')
  .get(checkAuth, getPosts)
  .post(Private, createPost)

router.route('/:slug')
  .get(checkAuth, getPost)
  .delete(Private, deletePost)

export default router
