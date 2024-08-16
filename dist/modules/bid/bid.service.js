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
exports.deleteBid = exports.getBidById = exports.getBidsForProperty = exports.updateProperty = exports.createBid = void 0;
// services/bid.service.ts
const property_model_1 = require("../property/property.model");
const bid_model_1 = require("../bid/bid.model");
const createBid = (bidData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bid_model_1.BidModel.create(bidData);
});
exports.createBid = createBid;
// Update the property with the highest bid
const updateProperty = (propertyId, bidAmount, bidderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.PropertyModel.findByIdAndUpdate(propertyId, { currentBid: bidAmount, highestBidder: bidderId }, { new: true }).exec();
});
exports.updateProperty = updateProperty;
const getBidsForProperty = (propertyId, queryBuilder) => __awaiter(void 0, void 0, void 0, function* () {
    const bids = yield queryBuilder
        .populate('bidder', 'username')
        .populate('property', 'title')
        .exec();
    const total = yield queryBuilder.countTotal();
    return { bids, total };
});
exports.getBidsForProperty = getBidsForProperty;
const getBidById = (bidId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bid_model_1.BidModel.findById(bidId)
        .populate('bidder', 'username email contactNumber firstName lastName')
        .populate('property', 'title location price')
        .exec();
});
exports.getBidById = getBidById;
// Delete a specific bid by its ID
const deleteBid = (bidId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bid_model_1.BidModel.findByIdAndDelete(bidId).exec();
});
exports.deleteBid = deleteBid;
