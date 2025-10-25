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
exports.ConversationControllers = void 0;
const catchAsync_1 = require("../../errorHelpers/catchAsync");
const userResponse_1 = require("../../utils/userResponse");
const conversation_services_1 = require("./conversation.services");
// Create conversation
const createConversation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield conversation_services_1.ConversationServices.createConversation(req.body);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'conversation crated successfully',
        data: result
    });
}));
// get user conversation
const getUserConversation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.userEmail;
    const adminEmail = 'safechildhoodnetwork@gmail.com';
    let conversations = yield conversation_services_1.ConversationServices.getUserConversation(userEmail);
    if (conversations.length === 0 && userEmail !== adminEmail) {
        const newConversation = yield conversation_services_1.ConversationServices.createConversation({
            senderEmail: userEmail,
            receiverEmail: adminEmail
        });
        conversations = [newConversation];
    }
    console.log(conversations);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'user conversation retrive successfully',
        data: conversations
    });
}));
exports.ConversationControllers = {
    createConversation,
    getUserConversation
};
