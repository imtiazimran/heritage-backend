// src/models/user.model.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { TUser } from './user.validation';

const { Schema, model, Types } = mongoose;

const userSchema = new Schema<TUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Bidder', 'PropertyOwner'], default: 'Bidder' },
    firstName: { type: String },
    lastName: { type: String },
    contactNumber: { type: String },
    profilePicture: { type: String },
    address: { type: String },
    propertiesOwned: [{ type: Types.ObjectId, ref: 'Property' }],
    bidsPlaced: [{ type: Types.ObjectId, ref: 'Bid' }],
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});


// Post-save hook to remove the password
userSchema.post('save', function ( doc, next) {
    doc.password = "";
    next();
})

// Virtual property to get full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
});

export const User = model('User', userSchema);
