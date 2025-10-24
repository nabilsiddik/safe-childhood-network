"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationSchema = new mongoose_1.default.Schema({
    members: {
        type: Array
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.Conversation = mongoose_1.default.model("Conversation", ConversationSchema);
