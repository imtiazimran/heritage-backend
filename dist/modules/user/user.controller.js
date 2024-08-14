"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require("./user.service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
// Create a new user
exports.registerUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.createUserIntoDB(req.body);
    const token = (0, jwt_1.generateTokens)(String(user === null || user === void 0 ? void 0 : user._id));
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: { user, token },
    });
}));
// login
exports.loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email });
    console.log(user, email, password);
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 401,
            success: false,
            message: 'Invalid email or password',
            data: null,
        });
    }
    const token = (0, jwt_1.generateTokens)(String(user === null || user === void 0 ? void 0 : user._id));
    user.password = "";
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: { token, user },
    });
}));
// Get all users
exports.getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.default(user_model_1.User.find(), req.query)
        .search(['username', 'email', 'firstName', 'lastName'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const users = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Users fetched successfully',
        data: users,
        meta: meta, // Pagination metadata
    });
}));
// Get a single user by ID
exports.getUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    const user = yield user_model_1.User.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    if (!user) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: 'User not found',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User fetched successfully',
        data: user,
    });
}));
// Update a user by ID
exports.updateUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.updateUserByIdIntoDB(req.params.id, req.body);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User updated successfully',
        data: user,
    });
}));
// Delete a user by ID
exports.deleteUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.deleteUserByIdFromDB(req.params.id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
}));
