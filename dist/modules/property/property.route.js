"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_controller_1 = require("./property.controller");
const handleValidation_1 = __importDefault(require("../../middlewares/handleValidation"));
const property_validation_1 = require("./property.validation");
const router = express_1.default.Router();
router.post('/create', (0, handleValidation_1.default)(property_validation_1.propertySchema), property_controller_1.createProperty);
router.get('/', property_controller_1.getAllProperties);
router.get('/:id', property_controller_1.getPropertyById);
router.put('/:id', (0, handleValidation_1.default)(property_validation_1.propertySchema.partial()), property_controller_1.updateProperty);
router.delete('/:id', property_controller_1.deleteProperty);
exports.default = router;
