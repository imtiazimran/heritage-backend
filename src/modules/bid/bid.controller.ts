// controllers/bid.controller.ts
import { Request, Response } from 'express';
import * as bidService from './bid.service';
import sendResponse from '../../utils/sendResponse';
import QueryBuilder from '../../builder/queryBuilder';
import { PropertyModel } from '../property/property.model';
import { BidModel } from './bid.model';

export const placeBid = async (req: Request, res: Response) => {
    try {
        const { property, amount, bidder } = req.body;

        // Validate bid data
        if (!property || !amount || !bidder) {
            throw new Error('Invalid bid data');
        }

        // Retrieve property and validate
        const foundProperty = await PropertyModel.findById(property).exec();
        if (!foundProperty) throw new Error('Property not found');

        const { minBid = 0, maxBid = Infinity, currentBid = 0 } = foundProperty;

        if (amount < minBid || amount > maxBid) throw new Error('Bid amount is out of the allowed range');
        if (amount <= currentBid) throw new Error('Bid amount must be higher than the current bid');

        // Create bid and update property
        const newBid = await bidService.createBid({ property, amount, bidder });
        await bidService.updateProperty(property, amount, bidder);

        return sendResponse(res, {
            statusCode: 201,
            success: true,
            data: newBid
        });
    } catch (error: any) {
        console.error('Error placing bid:', error.message);
        return sendResponse(res, {
            statusCode: error.message.includes('Invalid') || error.message.includes('not found') ? 400 : 500,
            success: false,
            message: error.message,
            data: null
        });
    }
};

export const getBidsForProperty = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const queryBuilder = new QueryBuilder(BidModel.find({ property: req.params.propertyId }), query);
        const { bids, total } = await bidService.getBidsForProperty(req.params.propertyId, queryBuilder);

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            data: bids,
            meta: total
        });
    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Server error',
            data: null
        });
    }
};

export const getBidById = async (req: Request, res: Response) => {
    try {
        const bid = await bidService.getBidById(req.params.id);
        if (!bid) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Bid not found',
                data: null
            });
        }

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            data: bid
        });
    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Server error',
            data: null
        });
    }
};

export const deleteBid = async (req: Request, res: Response) => {
    try {
        const deletedBid = await bidService.deleteBid(req.params.id);
        if (!deletedBid) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Bid not found',
                data: null
            });
        }

        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Bid deleted successfully',
            data: null
        });
    } catch (error) {
        return sendResponse(res, {
            statusCode: 500,
            success: false,
            message: 'Server error',
            data: null
        });
    }
};
