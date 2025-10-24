"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const conversation_routes_1 = __importDefault(require("../modules/conversation/conversation.routes"));
const message_routes_1 = __importDefault(require("../modules/message/message.routes"));
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.default
    },
    {
        path: '/auth',
        route: auth_routes_1.default
    },
    {
        path: '/conversation',
        route: conversation_routes_1.default
    },
    {
        path: '/message',
        route: message_routes_1.default
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
