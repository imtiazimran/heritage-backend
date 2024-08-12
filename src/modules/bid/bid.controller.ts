import { Request, Response } from 'express';
import { placeBidService, getBidsForPropertyService, getBidByIdService, deleteBidService } from './bid.service';
import sendResponse from '../../utils/sendResponse';
import QueryBuilder from '../../builder/queryBuilder';
import { BidModel } from './bid.model';


export const placeBid = async (req: Request, res: Response) => {
    try {
        const validatedBid = req.body;

        const newBid = await placeBidService(validatedBid);

        return sendResponse(res, {
            statusCode: 201,
            success: true,
            data: newBid
        });
    } catch (error: any) {
        console.error('Error placing bid:', error.message); // Log the error

        if (error.message === 'Property not found' || error.message === 'Bid amount must be higher than the current bid') {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: error.message,
                data: null
            });
        } else if (error.message === 'Invalid bid data') {
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: error.message,
                data: null
            });
        } else {
            return sendResponse(res, {
                statusCode: 500,
                success: false,
                message: 'Server error',
                data: null
            });
        }
    }
};





export const getBidsForProperty = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const queryBuilder = new QueryBuilder(BidModel.find({ property: req.params.propertyId }), query);
        const bids = await queryBuilder
            .search(['bidder.username']) // This is optional depending on your needs
            .filter()
            .sort()
            .paginate()
            .modelQuery
            .populate('bidder', 'username') // Populate bidder information
            .populate('property', 'title') // Optionally populate property information
            .exec();
        const total = await queryBuilder.countTotal();

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
        const bid = await BidModel.findById(req.params.id)
        .populate({
            path: 'bidder',
            select: 'username email contactNumber firstName lastName'
        })
        .populate({
            path: 'property',
            select: 'title location price' 
        })
        .exec();

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
        const deletedBid = await deleteBidService(req.params.id);

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
