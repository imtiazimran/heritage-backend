"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BidSchema = new mongoose_1.default.Schema({
    property: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Property', required: true },
    amount: { type: Number, required: true },
    bidder: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
exports.BidModel = mongoose_1.default.model('Bid', BidSchema);
