"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVars = ['PORT', 'DATABASE_URL', 'MONGODB_URI', 'JWT_ACCESS_SECRET', 'NODE_ENV', 'SALT_ROUND', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Env Variable ${key} is missing on .env file.`);
        }
    });
    return {
        PORT: process.env.port,
        MONGODB_URI: process.env.MONGODB_URI,
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        SALT_ROUND: process.env.SALT_ROUND,
        JWT: {
            JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
            JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        },
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        }
    };
};
exports.envVars = loadEnvVariables();
