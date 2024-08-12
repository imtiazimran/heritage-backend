import { z } from 'zod';
import mongoose from 'mongoose';

const bidSchema = z.object({
    property: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid property ID',
    }),
    amount: z.number().positive('Amount must be a positive number'),
    bidder: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid bidder ID',
    }),
});

// TypeScript type for the validated data
type TBid = {
    property: mongoose.Types.ObjectId;
    amount: number;
    bidder: mongoose.Types.ObjectId;
}

export { bidSchema, TBid };
