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
exports.deleteUserByIdFromDB = exports.updateUserByIdIntoDB = exports.getUserByIdFromDB = exports.getAllUsersFromDB = exports.createUserIntoDB = void 0;
const user_model_1 = require("./user.model");
// Create a new user
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new user_model_1.User(userData);
    return yield user_model_1.User.create(data);
});
exports.createUserIntoDB = createUserIntoDB;
// Get all users
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
exports.getAllUsersFromDB = getAllUsersFromDB;
// Get a single user by ID
const getUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findById(id);
});
exports.getUserByIdFromDB = getUserByIdFromDB;
// Update a user by ID
const updateUserByIdIntoDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndUpdate(id, userData, { new: true });
});
exports.updateUserByIdIntoDB = updateUserByIdIntoDB;
// Delete a user by ID
const deleteUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findByIdAndDelete(id);
});
exports.deleteUserByIdFromDB = deleteUserByIdFromDB;
