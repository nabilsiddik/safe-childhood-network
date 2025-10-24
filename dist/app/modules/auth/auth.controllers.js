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
exports.AuthControllers = void 0;
const catchAsync_1 = require("./../../errorHelpers/catchAsync");
const userResponse_1 = require("../../utils/userResponse");
const auth_services_1 = require("./auth.services");
// Get loged in user
const getLogedInUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.getLogedInUser(req);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'Loged in user retrived successfully.',
        data: result
    });
}));
// User login
const userLogin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.userLogin(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 60 * 30
    });
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Loged in Successfully',
        data: {
            accessToken,
            refreshToken,
        }
    });
}));
// Create patient
const userLogout = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('accessToken', '', {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(0)
    });
    res.cookie('refreshToken', '', {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(0)
    });
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'User Loged Out Successfully',
        data: null
    });
}));
exports.AuthControllers = {
    getLogedInUser,
    userLogin,
    userLogout
};
