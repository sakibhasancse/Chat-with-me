import express from 'express'
import { checkAuth } from '../../middleware/auth.middleware.js'
import { createTag, GetTags } from './Tag.controller.js'


const router = express.Router()

router.route('/')
    .get(GetTags)
    .post(createTag)

export default router