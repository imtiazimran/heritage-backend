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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBidService = exports.getBidByIdService = exports.getBidsForPropertyService = exports.placeBidService = void 0;
// services/bid.service.ts
const property_model_1 = require("../property/property.model");
const bid_model_1 = require("../bid/bid.model");
const placeBidService = (bidData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validate bidData to ensure it's correctly formatted
    if (!bidData.property || !bidData.amount || !bidData.bidder) {
        throw new Error('Invalid bid data');
    }
    // Check if property exists and get the current highest bid
    const property = yield property_model_1.PropertyModel.findById(bidData.property).exec();
    if (!property) {
        throw new Error('Property not found');
    }
    // Ensure currentBid is not undefined and compare with the new bid amount
    const currentBid = (_a = property.currentBid) !== null && _a !== void 0 ? _a : 0;
    if (bidData.amount <= currentBid) {
        throw new Error('Bid amount must be higher than the current bid');
    }
    // Create and save the new bid
    const newBid = new bid_model_1.BidModel(bidData);
    yield newBid.save();
    // Update the property with the new highest bid
    property.currentBid = bidData.amount;
    property.highestBidder = bidData.bidder;
    yield property.save();
    return newBid;
});
exports.placeBidService = placeBidService;
const getBidsForPropertyService = (propertyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bid_model_1.BidModel.find({ property: propertyId }).populate('bidder', 'username').exec();
});
exports.getBidsForPropertyService = getBidsForPropertyService;
const getBidByIdService = (bidId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bid_model_1.BidModel.findById(bidId).populate('bidder', 'username').exec();
});
exports.getBidByIdService = getBidByIdService;
const deleteBidService = (bidId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bid_model_1.BidModel.findByIdAndDelete(bidId).exec();
});
exports.deleteBidService = deleteBidService;
