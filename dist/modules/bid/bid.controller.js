"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bidService = __importStar(require("./bid.service"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const property_model_1 = require("../property/property.model");
const bid_model_1 = require("./bid.model");
const placeBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { property, amount, bidder } = req.body;
        // Validate bid data
        if (!property || !amount || !bidder) {
            throw new Error('Invalid bid data');
        }
        // Retrieve property and validate
        const foundProperty = yield property_model_1.PropertyModel.findById(property).exec();
        if (!foundProperty)
            throw new Error('Property not found');
        const { minBid = 0, maxBid = Infinity, currentBid = 0 } = foundProperty;
        if (amount < minBid || amount > maxBid)
            throw new Error('Bid amount is out of the allowed range');
        if (amount <= currentBid)
            throw new Error('Bid amount must be higher than the current bid');
        // Create bid and update property
        const newBid = yield bidService.createBid({ property, amount, bidder });
        yield bidService.updateProperty(property, amount, bidder);
        return (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            data: newBid
        });
    }
    catch (error) {
        console.error('Error placing bid:', error.message);
        return (0, sendResponse_1.default)(res, {
            statusCode: error.message.includes('Invalid') || error.message.includes('not found') ? 400 : 500,
            success: false,
            message: error.message,
            data: null
        });
    }
});
exports.placeBid = placeBid;
const getBidsForProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const queryBuilder = new queryBuilder_1.default(bid_model_1.BidModel.find({ property: req.params.propertyId }), query);
        const { bids, total } = yield bidService.getBidsForProperty(req.params.propertyId, queryBuilder);
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
        const bid = yield bidService.getBidById(req.params.id);
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
        const deletedBid = yield bidService.deleteBid(req.params.id);
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
