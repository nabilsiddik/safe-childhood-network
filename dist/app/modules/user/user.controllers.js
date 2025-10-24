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
exports.UserControllers = void 0;
const catchAsync_1 = require("./../../errorHelpers/catchAsync");
const userResponse_1 = require("../../utils/userResponse");
const user_services_1 = require("./user.services");
// Get all users from db
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = req.query;
    const result = yield user_services_1.UserServices.getAllUsers(options);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'All users retrived successfully.',
        data: result
    });
}));
// Get user by email
const getUserByEmail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.userEmail;
    const result = yield user_services_1.UserServices.getUserByEmail(userEmail);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Single user retrived successfully.',
        data: result
    });
}));
// Create user
const createUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.createUser(req.body);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'User Account Created Successfully',
        data: result
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    getUserByEmail
};
