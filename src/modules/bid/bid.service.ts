// services/bid.service.ts
import { PropertyModel } from '../property/property.model';
import { BidModel } from '../bid/bid.model';
import { TBid } from './bid.validation';

export const placeBidService = async (bidData: TBid) => {
    // Validate bidData to ensure it's correctly formatted
    if (!bidData.property || !bidData.amount || !bidData.bidder) {
        throw new Error('Invalid bid data');
    }

    // Check if property exists and get the current highest bid
    const property = await PropertyModel.findById(bidData.property).exec();
    if (!property) {
        throw new Error('Property not found');
    }

    // Ensure currentBid is not undefined and compare with the new bid amount
    const currentBid = property.currentBid ?? 0;

    if (bidData.amount <= currentBid) {
        throw new Error('Bid amount must be higher than the current bid');
    }

    // Create and save the new bid
    const newBid = new BidModel(bidData);
    await newBid.save();

    // Update the property with the new highest bid
    property.currentBid = bidData.amount;
    property.highestBidder = bidData.bidder;
    await property.save();

    return newBid;
};


export const getBidsForPropertyService = async (propertyId: string) => {
    return await BidModel.find({ property: propertyId }).populate('bidder', 'username').exec();
};

export const getBidByIdService = async (bidId: string) => {
    return await BidModel.findById(bidId).populate('bidder', 'username').exec();
};

export const deleteBidService = async (bidId: string) => {
    return await BidModel.findByIdAndDelete(bidId).exec();
};
