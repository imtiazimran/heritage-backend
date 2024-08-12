"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
    role: zod_1.z.enum(['Admin', 'Bidder', 'PropertyOwner']).default('Bidder'),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    contactNumber: zod_1.z.string().optional(),
    profilePicture: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    propertiesOwned: zod_1.z.array(zod_1.z.string()).optional(),
    bidsPlaced: zod_1.z.array(zod_1.z.string()).optional(),
    isActive: zod_1.z.boolean().default(true),
    isVerified: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional()
});
