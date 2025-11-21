import express from 'express';
import { getAllUsers, getMe } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';


const router = express.Router();
router.get('/', protect, asyncHandler(getAllUsers));
router.get('/me', protect, asyncHandler(getMe));


export default router;