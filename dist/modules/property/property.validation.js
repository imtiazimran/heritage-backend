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
    location: zod_1.z.string().min(1, 'Location is required'),
    area: zod_1.z.string().min(1, 'Area is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    totalArea: zod_1.z.string().min(1, 'Total area is required'),
    owner: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid owner ID',
    }),
    currentBid: zod_1.z.number().nonnegative().optional(),
    highestBidder: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: 'Invalid bidder ID',
    }).nullable().optional(),
    status: zod_1.z.string().min(1, 'Status is required'),
    images: zod_1.z.array(zod_1.z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
    details: zod_1.z.array(zod_1.z.object({
        label: zod_1.z.string().min(1, 'Label is required'),
        value: zod_1.z.string().min(1, 'Value is required'),
        icon: zod_1.z.string().url('Invalid icon URL').min(1, 'Icon URL is required')
    })).min(1, 'At least one detail is required'),
    propertyType: zod_1.z.string().min(1, 'Property type is required'),
    bathrooms: zod_1.z.number().int().positive('Bathrooms must be a positive integer'),
    bedrooms: zod_1.z.number().int().positive('Bedrooms must be a positive integer'),
    minBid: zod_1.z.number().nonnegative().optional(),
    maxBid: zod_1.z.number().nonnegative().optional()
});
exports.propertySchema = propertySchema;
