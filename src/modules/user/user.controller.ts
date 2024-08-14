// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { TUser } from './user.validation';
import catchAsync from '../../utils/catchAsync';
import QueryBuilder from '../../builder/queryBuilder';
import sendResponse from '../../utils/sendResponse';
import { User } from './user.model';
import generateToken from '../../utils/jwt';
import bcrypt from 'bcryptjs';
// Create a new user
export const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.createUserIntoDB(req.body as TUser);
    const token = generateToken(String(user?._id));

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: { user, token },
    });
});

// In your login controller
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'Invalid email or password',
            data: null,
        });
    }

    const token = generateToken(String(user?._id));
    user.password = "";  // Ensure password is not sent back

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: { user, token },
    });
});


// Get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const queryBuilder = new QueryBuilder(User.find(), req.query)
        .search(['username', 'email', 'firstName', 'lastName'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const users = await queryBuilder.modelQuery;
    const meta = await queryBuilder.countTotal();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users fetched successfully',
        data: users,
        meta: meta, // Pagination metadata
    });
});

// Get a single user by ID
export const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            message: 'User not found',
            data: null,
        });
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User fetched successfully',
        data: user,
    });
});

// Update a user by ID
export const updateUserById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.updateUserByIdIntoDB(req.params.id, req.body as Partial<TUser>);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User updated successfully',
        data: user,
    });
});

// Delete a user by ID
export const deleteUserById = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await userService.deleteUserByIdFromDB(req.params.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
});

