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
  const result = await ConversationServices.getUserConversation(userEmail as string)


  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'user conversation retrive successfully',
    data: result
  })
})

export const ConversationControllers = {
    createConversation,
    getUserConversation

}
