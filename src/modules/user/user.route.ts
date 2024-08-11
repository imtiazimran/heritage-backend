import express from 'express';
import validateRequest from '../../middlewares/handleValidation';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from './user.controller';
import { userSchema } from './user.validation';

const router = express.Router();

router.post('/create-user', validateRequest(userSchema), createUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', validateRequest(userSchema.partial()), updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;
