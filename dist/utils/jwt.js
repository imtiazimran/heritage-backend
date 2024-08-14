"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const generateTokens = (userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m', // e.g., 15 minutes
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d', // e.g., 7 days
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
// Refresh Token Route
exports.refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 400,
            success: false,
            message: "Refresh token is required",
            data: null,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET);
        const user = yield user_model_1.User.findById(decoded === null || decoded === void 0 ? void 0 : decoded.id);
        if (!user) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 401,
                success: false,
                message: "User not found",
                data: null,
            });
        }
        const tokens = (0, exports.generateTokens)(user._id);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Tokens refreshed successfully",
            data: tokens,
        });
    }
    catch (err) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 403,
            success: false,
            message: "Invalid refresh token",
            data: null,
        });
    }
}));
