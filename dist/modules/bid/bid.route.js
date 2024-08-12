"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/bid.routes.ts
const express_1 = require("express");
const bid_controller_1 = require("./bid.controller");
const handleValidation_1 = __importDefault(require("../../middlewares/handleValidation"));
const bid_validation_1 = require("./bid.validation");
// Create a router instance
const router = (0, express_1.Router)();
// Routes
router.post('/create', (0, handleValidation_1.default)(bid_validation_1.bidSchema), bid_controller_1.placeBid);
router.get('/properties/:propertyId', bid_controller_1.getBidsForProperty);
router.get('/:id', bid_controller_1.getBidById);
router.delete('/:id', bid_controller_1.deleteBid);
exports.default = router;
