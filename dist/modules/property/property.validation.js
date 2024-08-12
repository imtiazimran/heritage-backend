"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertySchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    images: zod_1.z.array(zod_1.z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
    location: zod_1.z.string().min(1, 'Location is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    bedrooms: zod_1.z.number().int().positive('Bedrooms must be a positive integer'),
    bathrooms: zod_1.z.number().int().positive('Bathrooms must be a positive integer'),
    currentBid: zod_1.z.number().nonnegative().optional(),
    highestBidder: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid bidder ID',
    }).nullable().optional(),
    owner: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid owner ID',
    }),
});
exports.propertySchema = propertySchema;
