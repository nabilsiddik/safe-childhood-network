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
exports.MessageServices = void 0;
const message_models_1 = require("./message.models");
// Create message
const createMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const messageData = {
        conversationId: payload.conversationId,
        sender: payload.sender,
        text: payload.text
    };
    const createdMessage = yield message_models_1.Message.create(messageData);
    return createdMessage;
});
// Get all messages of a specific conversation
const getSpecificConversationMessages = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_models_1.Message.find({
        conversationId
    });
    return messages;
});
exports.MessageServices = {
    createMessage,
    getSpecificConversationMessages
};
