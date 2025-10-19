
import { Request, Response } from 'express';
import { catchAsync } from './../../errorHelpers/catchAsync';
import { sendResponse } from '../../utils/userResponse';
import { UserServices } from './user.services';
import { pickQueries } from './../../utils/pickQueries';
import { userFilterableFields, userSearchableFields } from './user.constants';


// Get all users from db
// const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//   const filters =  pickQueries(req.query, userFilterableFields)
//   const options =  pickQueries(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])

//   const result = await UserServices.getAllUsers(filters, options);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'All users retrived successfully.',
//     data: result
//   })
// })


// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Patient Account Created Successfully',
    data: result
  })
})


export const UserControllers = {
  createUser,
}