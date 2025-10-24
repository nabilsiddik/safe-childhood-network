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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const env_1 = require("../../config/env");
const generateJwtToken_1 = require("../../utils/generateJwtToken");
const user_models_1 = require("../user/user.models");
const http_status_codes_1 = require("http-status-codes");
// Get loged in user
const getLogedInUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    const logedInUser = yield user_models_1.User.findOne({ email }).select('fullName email profilePhoto status role -_id');
    if (!logedInUser) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User is unauthorized');
    }
    return logedInUser;
});
// User login
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_models_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!existingUser) {
        throw new appError_1.default(400, 'User with this email not found.');
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
    if (!isPasswordMatch) {
        throw new appError_1.default(400, 'Password is incorrect');
    }
    // Generate access Token
    const accessToken = (0, generateJwtToken_1.generateJwtToken)({ email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email, role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role }, env_1.envVars.JWT.JWT_ACCESS_SECRET, '1h');
    // Generate refresh Token
    const refreshToken = (0, generateJwtToken_1.generateJwtToken)({ email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email, role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role }, env_1.envVars.JWT.JWT_REFRESH_SECRET, '30d');
    return {
        accessToken,
        refreshToken,
    };
});
exports.AuthServices = {
    userLogin,
    getLogedInUser
};
