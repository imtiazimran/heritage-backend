"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
// routes
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const property_route_1 = __importDefault(require("./modules/property/property.route"));
const bid_route_1 = __importDefault(require("./modules/bid/bid.route"));
const jwt_1 = require("./utils/jwt");
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://heritage-backend.vercel.app'
    ],
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/api/v1/users', user_route_1.default);
app.use('/api/v1/property', property_route_1.default);
app.use('/api/v1/bids', bid_route_1.default);
app.post('/api/v1/refresh', jwt_1.refreshToken);
app.get('/', (req, res) => {
    res.send('heritage-server is running...');
});
app.use(errorHandler_1.default);
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "No route found"
    });
});
exports.default = app;
