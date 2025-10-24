"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_controllers_1 = require("./conversation.controllers");
const conversationRoute = (0, express_1.Router)();
conversationRoute.get('/:userEmail', conversation_controllers_1.ConversationControllers.getUserConversation);
conversationRoute.post('/', conversation_controllers_1.ConversationControllers.createConversation);
exports.default = conversationRoute;
