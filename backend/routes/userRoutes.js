import express from 'express'
const router = express.Router()
// -middleware to verify token
import { authMiddleware } from '../middlewares/authMiddleware.js'
// -controllers
import { 
    authUser, 
    getUserProfile, 
    logoutUser, 
    registerUser, 
    updateUserProfile 
} from '../controllers/userControllers.js'


router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router.get('/profile', authMiddleware, getUserProfile)
router.put('/profile', authMiddleware, updateUserProfile)

export { router }