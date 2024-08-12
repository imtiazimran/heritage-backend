import mongoose from "mongoose";
import { TBid } from "./bid.validation";

const BidSchema= new mongoose.Schema<TBid>({
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    amount: { type: Number, required: true },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const BidModel = mongoose.model<TBid>('Bid', BidSchema);