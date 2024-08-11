// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { TUser } from './user.validation';
import catchAsync from '../../utils/catchAsync';

// Create a new user
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.createUserIntoDB(req.body as TUser);
    res.status(201).json(user);
});

// Get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await userService.getAllUsersFromDB();
    res.status(200).json(users);
});

// Get a single user by ID
export const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.getUserByIdFromDB(req.params.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json(user);
});

// Update a user by ID
export const updateUserById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.updateUserByIdIntoDB(req.params.id, req.body as Partial<TUser>);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json(user);
});

// Delete a user by ID
export const deleteUserById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.deleteUserByIdFromDB(req.params.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
});

