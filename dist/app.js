"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)(
//     {
//     origin: [
//         'http://localhost:5173',
//     ],
//     methods: "GET,POST,PUT,PATCH,DELETE",
//     credentials: true,
// }
));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('heritage-server is running...');
});
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "No route found"
    });
});
exports.default = app;
