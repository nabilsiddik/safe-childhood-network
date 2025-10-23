import { Router } from "express";
import { MessageControllers } from "./messages.controllers";

const messageRouter = Router()

messageRouter.post('/', MessageControllers.crateMessage)
messageRouter.get('/:conversationId', MessageControllers.getSpecificConversationMessages)

export default messageRouter 