import { Request, Response } from "express"
import { catchAsync } from "../../errorHelpers/catchAsync"
import { sendResponse } from "../../utils/userResponse"
import { ConversationServices } from "./conversation.services"

// Create conversation
const createConversation = catchAsync(async (req: Request, res: Response) => {

  const result = await ConversationServices.createConversation(req.body)


  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'conversation crated successfully',
    data: result
  })
})

// get user conversation
const getUserConversation = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.params.userEmail
  const adminEmail = 'safechildhoodnetwork@gmail.com'

  let conversations = await ConversationServices.getUserConversation(userEmail)

  if(conversations.length === 0 && userEmail !== adminEmail){
    const newConversation = await ConversationServices.createConversation({
      senderEmail: userEmail,
      receiverEmail: adminEmail
    })

    conversations = [newConversation]
  }


  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'user conversation retrive successfully',
    data: conversations
  })
})

export const ConversationControllers = {
    createConversation,
    getUserConversation

}
