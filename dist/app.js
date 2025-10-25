"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/routes");
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./app/config/env");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: 'https://safe-childhood-network-client.vercel.app',
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/api/v1', routes_1.router);
exports.app.get('/', (req, res) => {
    res.status(200).json({
        message: `Server is running on port ${env_1.envVars.PORT}`
    });
});
exports.app.use(globalErrorHandler_1.default);
