"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const checkauth_1 = require("../../middlewares/checkauth");
const user_interfaces_1 = require("./user.interfaces");
const userRouter = (0, express_1.Router)();
// Get all users 
userRouter.get('/', (0, checkauth_1.checkAuth)(user_interfaces_1.UserRole.ADMIN), user_controllers_1.UserControllers.getAllUsers);
// Get user by email
userRouter.get('/:userEmail', user_controllers_1.UserControllers.getUserByEmail);
// Create user route
userRouter.post('/', user_controllers_1.UserControllers.createUser);
exports.default = userRouter;
