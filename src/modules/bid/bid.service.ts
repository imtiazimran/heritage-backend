// services/bid.service.ts
import { PropertyModel } from '../property/property.model';
import { BidModel } from '../bid/bid.model';
import { TBid } from './bid.validation';

export const createBid = async (bidData: TBid) => {
    return await BidModel.create(bidData);
};

// Update the property with the highest bid
export const updateProperty = async (propertyId: string, bidAmount: number, bidderId: string) => {
    return await PropertyModel.findByIdAndUpdate(
        propertyId,
        { currentBid: bidAmount, highestBidder: bidderId },
        { new: true }
    ).exec();
};



export const getBidsForProperty = async (propertyId: string, queryBuilder: any) => {
    const bids = await queryBuilder
        .populate('bidder', 'username')
        .populate('property', 'title')
        .exec();
    const total = await queryBuilder.countTotal();
    return { bids, total };
};

export const getBidById = async (bidId: string) => {
    return await BidModel.findById(bidId)
        .populate('bidder', 'username email contactNumber firstName lastName')
        .populate('property', 'title location price')
        .exec();
};

// Delete a specific bid by its ID
export const deleteBid = async (bidId: string) => {
    return await BidModel.findByIdAndDelete(bidId).exec();
};
