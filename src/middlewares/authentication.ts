import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { User } from '../modules/user/user.model';

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'Not authorized, no token',
            data: null,
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'Not authorized, user not found',
            data: null,
        });
    }

    req.user = user;  // Type assertion here
    next();
});
