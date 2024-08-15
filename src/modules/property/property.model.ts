import mongoose from "mongoose";
import { TProperty } from "./property.validation";

const PropertySchema = new mongoose.Schema<TProperty>({
    title: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    totalArea: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    currentBid: { type: Number, default: 0 },
    highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, required: true },
    image: [{ type: String, required: true }],
    details: [{
        label: { type: String, required: true },
        value: { type: String, required: true },
        icon: { type: String, required: true }
    }],
    propertyType: { type: String, required: true },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true }
}, { timestamps: true });

export const PropertyModel = mongoose.model<TProperty>('Property', PropertySchema);
