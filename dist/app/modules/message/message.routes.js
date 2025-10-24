"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_controllers_1 = require("./messages.controllers");
const messageRouter = (0, express_1.Router)();
messageRouter.post('/', messages_controllers_1.MessageControllers.crateMessage);
messageRouter.get('/:conversationId', messages_controllers_1.MessageControllers.getSpecificConversationMessages);
exports.default = messageRouter;
