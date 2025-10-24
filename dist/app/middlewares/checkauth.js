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
exports.checkAuth = void 0;
const env_1 = require("../config/env");
const generateJwtToken_1 = require("../utils/generateJwtToken");
const checkAuth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
            if (!token) {
                throw new Error('Token not found');
            }
            const verifiedToken = (0, generateJwtToken_1.verifyToken)(token, env_1.envVars.JWT.JWT_ACCESS_SECRET);
            if (!verifiedToken) {
                throw new Error('You is not authorized');
            }
            req.user = verifiedToken;
            if (roles.length && !roles.includes(verifiedToken.role)) {
                throw new Error('You are not authorized');
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.checkAuth = checkAuth;
