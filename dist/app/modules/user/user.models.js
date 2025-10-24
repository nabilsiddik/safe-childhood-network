"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_interfaces_1 = require("./user.interfaces");
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePhoto: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.keys(user_interfaces_1.UserStatus),
        default: user_interfaces_1.UserStatus.ACTIVE
    },
    role: {
        type: String,
        enum: Object.keys(user_interfaces_1.UserRole),
        default: user_interfaces_1.UserRole.USER
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.User = mongoose_1.default.model("User", userSchema);
