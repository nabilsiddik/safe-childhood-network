"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interfaces_1 = require("./user.interfaces");
// patient creation input zod schema
const createUserValidationSchema = zod_1.default.object({
    fullName: zod_1.default.string('Full Name is required'),
    email: zod_1.default.email('Email is required'),
    password: zod_1.default.string().min(6, 'Password length must be at least 6').max(12, 'Password length must be maximum 12'),
    address: zod_1.default.string().optional(),
    gender: zod_1.default.enum([user_interfaces_1.Gender.MALE, user_interfaces_1.Gender.FEMALE], {
        error: 'Gender is required'
    }).optional(),
    profilePhoto: zod_1.default.string().optional()
});
exports.UserValidation = {
    createUserValidationSchema,
};
