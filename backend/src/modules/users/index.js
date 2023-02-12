import express from 'express'
import { checkRefreshToken } from '../../middleware/auth.middleware.js'
import { registerUser, loginUser, getRefreshToken } from './user.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', checkRefreshToken, getRefreshToken)

export default router
