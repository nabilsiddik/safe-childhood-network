"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const checkauth_1 = require("../../middlewares/checkauth");
const user_interfaces_1 = require("../user/user.interfaces");
const authRouter = (0, express_1.Router)();
authRouter.get('/me', (0, checkauth_1.checkAuth)(...Object.keys(user_interfaces_1.UserRole)), auth_controllers_1.AuthControllers.getLogedInUser);
authRouter.post('/login', auth_controllers_1.AuthControllers.userLogin);
// authRouter.post('/logout', AuthControllers.userLogout)
exports.default = authRouter;
