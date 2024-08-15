import { z } from 'zod';
import mongoose from 'mongoose';

const propertySchema = z.object({
    title: z.string().min(1, 'Title is required'),
    location: z.string().min(1, 'Location is required'),
    area: z.string().min(1, 'Area is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    totalArea: z.string().min(1, 'Total area is required'),
    owner: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid owner ID',
    }),
    currentBid: z.number().nonnegative().optional(),
    highestBidder: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid bidder ID',
    }).nullable().optional(),
    status: z.string().min(1, 'Status is required'),
    images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
    details: z.array(z.object({
        label: z.string().min(1, 'Label is required'),
        value: z.string().min(1, 'Value is required'),
        icon: z.string().url('Invalid icon URL').min(1, 'Icon URL is required')
    })).min(1, 'At least one detail is required'),
    propertyType: z.string().min(1, 'Property type is required'),
    bathrooms: z.number().int().positive('Bathrooms must be a positive integer'),
    bedrooms: z.number().int().positive('Bedrooms must be a positive integer'),
});


type TPropertyDetail = {
    label: string;
    value: string;
    icon: string;
};

type TProperty = {
    title: string;
    location: string;
    area: string;
    description: string;
    price: number;
    totalArea: string;
    owner: mongoose.Types.ObjectId;
    currentBid?: number;
    highestBidder?: mongoose.Types.ObjectId | null;
    status: string;
    image: string[];
    details: TPropertyDetail[];
    propertyType: string;
    bathrooms: number;
    bedrooms: number;
};



export { propertySchema, TProperty };
