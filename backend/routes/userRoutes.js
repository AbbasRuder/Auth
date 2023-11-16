import express from 'express'
const router = express.Router()
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
router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)

export { router }