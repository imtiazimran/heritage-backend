"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBid = exports.getBidById = exports.getBidsForProperty = exports.placeBid = void 0;
const bid_service_1 = require("./bid.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const bid_model_1 = require("./bid.model");
const placeBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedBid = req.body;
        const newBid = yield (0, bid_service_1.placeBidService)(validatedBid);
        return (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            data: newBid
        });
    }
    catch (error) {
        console.error('Error placing bid:', error.message); // Log the error
        if (error.message === 'Property not found' || error.message === 'Bid amount must be higher than the current bid') {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: error.message,
                data: null
            });
        }
        else if (error.message === 'Invalid bid data') {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: error.message,
                data: null
            });
        }
        else {
            return (0, sendResponse_1.default)(res, {
                statusCode: 500,
                success: false,
                message: 'Server error',
                data: null
            });
        }
    }
});
exports.placeBid = placeBid;
const getBidsForProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const queryBuilder = new queryBuilder_1.default(bid_model_1.BidModel.find({ property: req.params.propertyId }), query);
        const bids = yield queryBuilder
            .search(['bidder.username']) // This is optional depending on your needs
            .filter()
            .sort()
            .paginate()
            .modelQuery
            .populate('bidder', 'username') // Populate bidder information
            .populate('property', 'title') // Optionally populate property information
            .exec();
        const total = yield queryBuilder.countTotal();
        return (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            data: bids,
            meta: total
        });
    }
    catch (error) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: 'Server error',
            data: null
        });
    }
});
exports.getBidsForProperty = getBidsForProperty;
const getBidById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bid = yield bid_model_1.BidModel.findById(req.params.id)
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
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: 'Bid not found',
                data: null
            });
        }
        return (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            data: bid
        });
    }
    catch (error) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: 'Server error',
            data: null
        });
    }
});
exports.getBidById = getBidById;
const deleteBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBid = yield (0, bid_service_1.deleteBidService)(req.params.id);
        if (!deletedBid) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: 'Bid not found',
                data: null
            });
        }
        return (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Bid deleted successfully',
            data: null
        });
    }
    catch (error) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: 'Server error',
            data: null
        });
    }
});
exports.deleteBid = deleteBid;
