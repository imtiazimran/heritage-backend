import express from 'express';
import validateRequest from '../../middlewares/handleValidation';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from './user.controller';
import { userSchema } from './user.validation';

const router = express.Router();

router.post('/create', validateRequest(userSchema), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validateRequest(userSchema.partial()), updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;
