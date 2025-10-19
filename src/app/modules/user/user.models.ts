import mongoose from "mongoose";
import { UserRole, UserStatus } from "./user.interfaces";

const userSchema = new mongoose.Schema(
    {
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
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm password"],
            minlength: [6, "Confirm password must be at least 6 characters long"],
        },
        profilePhoto: {
            type: String,
        },
        userStatus: {
            type: String,
            enum: Object.keys(UserStatus),
            default: UserStatus.ACTIVE
        },
        userRole: {
            type: String,
            enum: Object.keys(UserRole),
            default: UserRole.USER
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const User = mongoose.model("User", userSchema);
