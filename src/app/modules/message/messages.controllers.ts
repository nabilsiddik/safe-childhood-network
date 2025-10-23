import { Request, Response } from "express"
import { catchAsync } from "../../errorHelpers/catchAsync"
import { MessageServices } from "./message.services"
import { sendResponse } from "../../utils/userResponse"

// Create message
const crateMessage = catchAsync(async (req: Request, res: Response) => {

  const result = await MessageServices.createMessage(req.body)


  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'message crated successfully',
    data: result
  })
})


// Get specific conversation messages
const getSpecificConversationMessages = catchAsync(async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId
  const result = await MessageServices.getSpecificConversationMessages(conversationId as string)


  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Specific conversation messages retrived successfully.',
    data: result
  })
})


export const MessageControllers = {
    crateMessage,
    getSpecificConversationMessages
}
