
import { Request, Response } from 'express';
import { catchAsync } from './../../errorHelpers/catchAsync';
import { sendResponse } from '../../utils/userResponse';
import { AuthServices } from './auth.services';

// Create patient
const userLogin = catchAsync(async(req: Request, res: Response)=> {
  const result = await AuthServices.userLogin(req.body);
  const {accessToken, refreshToken} = result

  res.cookie('accessToken', accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60
  })

  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
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
const userLogout = catchAsync(async(req: Request, res: Response)=> {

  res.cookie('accessToken', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    expires: new Date(0)
  })

  res.cookie('refreshToken', '', {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
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
    userLogin,
    userLogout
}