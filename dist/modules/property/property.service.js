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
exports.deletePropertyService = exports.updatePropertyService = exports.getPropertyByIdService = exports.getAllPropertiesService = exports.createPropertyService = void 0;
const quiryBuilder_1 = __importDefault(require("../../builder/quiryBuilder"));
const property_model_1 = require("./property.model");
const createPropertyService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newProperty = new property_model_1.PropertyModel(data);
    return yield newProperty.save();
});
exports.createPropertyService = createPropertyService;
const getAllPropertiesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new quiryBuilder_1.default(property_model_1.PropertyModel.find(), query)
        .search(['name', 'location'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const properties = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return { properties, meta };
});
exports.getAllPropertiesService = getAllPropertiesService;
const getPropertyByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.PropertyModel.findById(id);
});
exports.getPropertyByIdService = getPropertyByIdService;
const updatePropertyService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.PropertyModel.findByIdAndUpdate(id, data, { new: true });
});
exports.updatePropertyService = updatePropertyService;
const deletePropertyService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.PropertyModel.findByIdAndDelete(id);
});
exports.deletePropertyService = deletePropertyService;
