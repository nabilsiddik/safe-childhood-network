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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const user_models_1 = require("./user.models");
const applyQuery_1 = require("../../utils/applyQuery");
// Get all users
const getAllUsers = (options) => {
    const queryOptions = {
        page: Number(options.page) || 1,
        limit: Number(options.limit) || 10,
        sortField: options.sortField || 'createdAt',
        sortOrder: (options.sortOrder === 'asc' ? 'asc' : 'desc'),
        search: options.search || '',
        searchFields: ['fullName', 'email'],
        filter: {}
    };
    if (options.role)
        queryOptions.filter.role = options.role;
    if (options.status)
        queryOptions.filter.status = options.status;
    const result = (0, applyQuery_1.applyQuery)(user_models_1.User, queryOptions);
    return result;
};
// Get user by email
const getUserByEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_models_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new appError_1.default(404, 'user not found');
    }
    return user;
});
// Create user
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, profilePhoto } = payload;
    const existingUser = yield user_models_1.User.findOne({ email });
    if (existingUser) {
        throw new appError_1.default(400, 'A user with this email already exist.');
    }
    // const hashedPassword = await bcrypt.hash(userPassword, Number(envVars.SALT_ROUND))
    const userData = {
        fullName,
        email,
        profilePhoto
    };
    const createdUser = yield user_models_1.User.create(userData);
    const userObj = createdUser.toObject();
    const { password } = userObj, resUser = __rest(userObj, ["password"]);
    return resUser;
});
exports.UserServices = {
    createUser,
    getAllUsers,
    getUserByEmail
};
