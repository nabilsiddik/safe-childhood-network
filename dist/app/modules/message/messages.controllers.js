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
exports.MessageControllers = void 0;
const catchAsync_1 = require("../../errorHelpers/catchAsync");
const message_services_1 = require("./message.services");
const userResponse_1 = require("../../utils/userResponse");
// Create message
const crateMessage = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_services_1.MessageServices.createMessage(req.body);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'message crated successfully',
        data: result
    });
}));
// Get specific conversation messages
const getSpecificConversationMessages = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conversationId = req.params.conversationId;
    const result = yield message_services_1.MessageServices.getSpecificConversationMessages(conversationId);
    (0, userResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: 'Specific conversation messages retrived successfully.',
        data: result
    });
}));
exports.MessageControllers = {
    crateMessage,
    getSpecificConversationMessages
};
