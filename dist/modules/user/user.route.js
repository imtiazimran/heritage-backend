"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleValidation_1 = __importDefault(require("../../middlewares/handleValidation"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const authentication_1 = require("../../middlewares/authentication");
const router = express_1.default.Router();
router.post('/register', (0, handleValidation_1.default)(user_validation_1.userSchema), user_controller_1.registerUser);
router.post('/login', user_controller_1.loginUser);
router.get('/all', user_controller_1.getAllUsers);
router.get('/', authentication_1.protect, user_controller_1.getUserById);
router.put('/:id', (0, handleValidation_1.default)(user_validation_1.userSchema.partial()), user_controller_1.updateUserById);
router.delete('/user/:id', user_controller_1.deleteUserById);
exports.default = router;
