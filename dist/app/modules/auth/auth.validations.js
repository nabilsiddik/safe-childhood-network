"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const userLoginZodSchema = zod_1.default.object({
    email: zod_1.default.string('Email is required'),
    password: zod_1.default.string(),
});
exports.AuthValidations = {
    userLoginZodSchema
};
