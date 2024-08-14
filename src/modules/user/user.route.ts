import express from 'express';
import validateRequest from '../../middlewares/handleValidation';
import {  deleteUserById, getAllUsers, getUserById, loginUser, registerUser, updateUserById } from './user.controller';
import { userSchema } from './user.validation';
import { protect } from '../../middlewares/authentication';

const router = express.Router();

router.post('/register', validateRequest(userSchema), registerUser);
router.post('/login', loginUser);
router.get('/all', getAllUsers);
router.get('/',protect, getUserById);
router.put('/:id', validateRequest(userSchema.partial()), updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;
