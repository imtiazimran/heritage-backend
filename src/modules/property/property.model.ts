import mongoose from "mongoose";
import { TProperty } from "./property.validation";

const PropertySchema = new mongoose.Schema<TProperty>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    location: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    currentBid: { type: Number, default: 0 },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const PropertyModel = mongoose.model<TProperty>('Property', PropertySchema);