import { Router } from "express";
import { ConversationControllers } from "./conversation.controllers";

const conversationRoute = Router()

conversationRoute.get('/:userId', ConversationControllers.getUserConversation)
conversationRoute.post('/', ConversationControllers.createConversation)

export default conversationRoute