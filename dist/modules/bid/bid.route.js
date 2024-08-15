"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/bid.routes.ts
const express_1 = require("express");
const bid_controller_1 = require("./bid.controller");
// Create a router instance
const router = (0, express_1.Router)();
// Routes
router.post('/create', bid_controller_1.placeBid);
router.get('/properties/:propertyId', bid_controller_1.getBidsForProperty);
router.get('/:id', bid_controller_1.getBidById);
router.delete('/:id', bid_controller_1.deleteBid);
exports.default = router;
