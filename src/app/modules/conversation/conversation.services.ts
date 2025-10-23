import { Request } from "express"
import { Conversation } from "./conversation.models"

// Create conversation
const createConversation = async(payload: {
    senderId: string,
    receiverId: string
}) => {

    const createdConversation = await Conversation.create({
        members: [payload.senderId, payload.receiverId]
    })

    console.log(createdConversation)

    return createdConversation
}


// Get conversation of a user
const getUserConversation = async(userId: string) => {
    const conversation = await Conversation.find({
        members: {$in: [userId]}
    })

    return conversation
}


export const ConversationServices = {
    createConversation,
    getUserConversation
}