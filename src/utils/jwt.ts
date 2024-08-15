import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

export const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });

    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    });

    return { accessToken, refreshToken };
};

// Refresh Token Route
export const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Refresh token is required",
            data: null,
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { id: string };

        const user = await User.findById(decoded?.id);

        if (!user) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message: "User not found",
                data: null,
            });
        }

        const tokens = generateTokens(user._id);

        // Set the new refresh token in an HTTP-only cookie
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'none', 
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Tokens refreshed successfully",
            data: { accessToken: tokens.accessToken }, // Send only the access token in the response
        });
    } catch (err) {
        return sendResponse(res, {
            statusCode: 403,
            success: false,
            message: "Invalid refresh token",
            data: null,
        });
    }
});
