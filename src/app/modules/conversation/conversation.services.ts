import { Request } from "express"
import { Conversation } from "./conversation.models"

// Create conversation
const createConversation = async(payload: {
    senderEmail: string,
    receiverEmail: string
}) => {

    const createdConversation = await Conversation.create({
        members: [payload.senderEmail, payload.receiverEmail]
    })

    console.log(createdConversation)

    return createdConversation
}


// Get conversation of a user
const getUserConversation = async(userEmail: string) => {
    const conversation = await Conversation.find({
        members: {$in: [userEmail]}
    })

    return conversation
}


export const ConversationServices = {
    createConversation,
    getUserConversation
}