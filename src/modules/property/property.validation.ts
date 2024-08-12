import { z } from 'zod';
import mongoose from 'mongoose';

const propertySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
    location: z.string().min(1, 'Location is required'),
    price: z.number().positive('Price must be a positive number'),
    bedrooms: z.number().int().positive('Bedrooms must be a positive integer'),
    bathrooms: z.number().int().positive('Bathrooms must be a positive integer'),
    currentBid: z.number().nonnegative().optional(),
    highestBidder: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid bidder ID',
    }).nullable().optional(),
    owner: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid owner ID',
    }),
});

// TypeScript type for the validated data
type TProperty = {
    title: string;
    description: string;
    images: string[];
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    currentBid?: number;
    highestBidder?: mongoose.Types.ObjectId | null;
    owner: mongoose.Types.ObjectId;
};

export { propertySchema, TProperty };
