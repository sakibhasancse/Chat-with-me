import express from 'express'
import { checkAuth, checkRefreshToken } from '../../middleware/auth.middleware.js'
import { registerUser, loginUser, getRefreshToken, getProfile, getUserProfile, updateProfile } from './user.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', checkRefreshToken, getRefreshToken)
router.get('/my-profile', checkAuth, getProfile)
router.post('/my-profile', checkAuth, updateProfile)
router.get('/user-profile/:userId', getUserProfile)

export default router