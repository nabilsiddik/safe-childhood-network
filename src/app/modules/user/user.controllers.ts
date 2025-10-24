
import { Request, Response } from 'express';
import { catchAsync } from './../../errorHelpers/catchAsync';
import { sendResponse } from '../../utils/userResponse';
import { UserServices } from './user.services';
import { pickQueries } from './../../utils/pickQueries';
import { userFilterableFields, userSearchableFields } from './user.constants';
import { User } from './user.models';
import { IUser } from './user.interfaces';


// Get all users from db
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const options = req.query

  const result = await UserServices.getAllUsers(options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All users retrived successfully.',
    data: result
  })
})


// Get user by email
const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.params.userEmail

  const result = await UserServices.getUserByEmail(userEmail as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single user retrived successfully.',
    data: result
  })
})



// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Account Created Successfully',
    data: result
  })
})


export const UserControllers = {
  createUser,
  getAllUsers,
  getUserByEmail
}