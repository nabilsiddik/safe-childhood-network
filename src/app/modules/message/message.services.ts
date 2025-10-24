import { Message } from "./message.models"

// Create message
const createMessage = async(payload: {
    conversationId: string,
    sender: string,
    text: string
}) => {



    const messageData = {
        conversationId: payload.conversationId,
        sender: payload.sender,
        text: payload.text
    }

    const createdMessage = await Message.create(messageData)


    return createdMessage
}

// Get all messages of a specific conversation
const getSpecificConversationMessages = async(conversationId: string) => {


    const messages = await Message.find({
        conversationId
    })


    return messages
}

export const MessageServices = {
    createMessage,
    getSpecificConversationMessages
}
