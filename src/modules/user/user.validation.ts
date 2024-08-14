import { z } from 'zod';

export const userSchema = z.object({
    _id: z.string().optional(),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    role: z.enum(['Admin', 'Bidder', 'PropertyOwner']).default('Bidder'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    contactNumber: z.string().optional(),
    profilePicture: z.string().optional(),
    address: z.string().optional(),
    propertiesOwned: z.array(z.string()).optional(), 
    bidsPlaced: z.array(z.string()).optional(), 
    isActive: z.boolean().default(true),
    isVerified: z.boolean().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional() 
});

export type TUser = z.infer<typeof userSchema>;
