
import { Request, Response } from 'express';
import { catchAsync } from './../../errorHelpers/catchAsync';
import { sendResponse } from '../../utils/userResponse';
import { AuthServices } from './auth.services';
import { envVars } from '../../config/env';


// Get loged in user
const getLogedInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.getLogedInUser(req)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Loged in user retrived successfully.',
    data: result
  })

})

// User login
const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.userLogin(req.body);
  const { accessToken, refreshToken } = result

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 60 * 30
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Loged in Successfully',
    data: {
      accessToken,
      refreshToken,
    }
  })
})

// Create patient
const userLogout = catchAsync(async (req: Request, res: Response) => {

  res.cookie('accessToken', '', {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(0)
  })

  res.cookie('refreshToken', '', {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(0)
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Loged Out Successfully',
    data: null
  })
})


export const AuthControllers = {
  getLogedInUser,
  userLogin,
  userLogout
}