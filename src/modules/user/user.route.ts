import express from 'express';
import validateRequest from '../../middlewares/handleValidation';
import {  deleteUserById, getAllUsers, getUserById, loginUser, registerUser, updateUserById } from './user.controller';
import { userSchema } from './user.validation';

const router = express.Router();

router.post('/register', validateRequest(userSchema), registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validateRequest(userSchema.partial()), updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;
