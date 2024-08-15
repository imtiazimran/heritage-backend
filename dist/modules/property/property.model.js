"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PropertySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    totalArea: { type: String, required: true },
    owner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    currentBid: { type: Number, default: 0 },
    highestBidder: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, required: true },
    image: [{ type: String, required: true }],
    details: [{
            label: { type: String, required: true },
            value: { type: String, required: true },
            icon: { type: String, required: true }
        }],
    propertyType: { type: String, required: true },
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true }
}, { timestamps: true });
exports.PropertyModel = mongoose_1.default.model('Property', PropertySchema);
