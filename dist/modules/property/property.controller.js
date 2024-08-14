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
exports.deleteProperty = exports.updateProperty = exports.getPropertyById = exports.getAllProperties = exports.createProperty = void 0;
const property_service_1 = require("./property.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Create a new property
exports.createProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProperty = yield (0, property_service_1.createPropertyService)(req.body);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, data: newProperty });
}));
// Get all properties
exports.getAllProperties = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { properties, meta } = yield (0, property_service_1.getAllPropertiesService)(req.query);
    console.log(properties.length, req.query);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: properties, meta });
}));
// Get a single property by ID
exports.getPropertyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield (0, property_service_1.getPropertyByIdService)(req.params.id);
    if (!property) {
        return (0, sendResponse_1.default)(res, { statusCode: 404, success: false, message: 'Property not found', data: null });
    }
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: property });
}));
// Update a property
exports.updateProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProperty = yield (0, property_service_1.updatePropertyService)(req.params.id, req.body);
    if (!updatedProperty) {
        return (0, sendResponse_1.default)(res, { statusCode: 404, success: false, message: 'Property not found', data: null });
    }
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, data: updatedProperty });
}));
// Delete a property
exports.deleteProperty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProperty = yield (0, property_service_1.deletePropertyService)(req.params.id);
    if (!deletedProperty) {
        return (0, sendResponse_1.default)(res, { statusCode: 404, success: false, message: 'Property not found', data: null });
    }
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Property deleted successfully', data: null });
}));
