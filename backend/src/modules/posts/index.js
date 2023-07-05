import express from 'express'
import { checkAuth, Private } from '../../middleware/auth.middleware.js'
import { getPost, getPosts, getPostsByUser, deletePost, createPost } from './post.controller.js'

const router = express.Router()

router.route('/')
    .get(checkAuth, getPosts)
    .post(Private, createPost)

router.route('/:slug')
    .get(checkAuth, getPost)
    .delete(Private, deletePost)

router.route('/user')
    .get(checkAuth, getPostsByUser)

router.route('/user/:userId')
    .get(checkAuth, getPostsByUser)

export default router