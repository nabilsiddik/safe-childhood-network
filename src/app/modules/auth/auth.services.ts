import { userLoginInput } from "./auth.interfaces"
import bcrypt from 'bcrypt'
import AppError from "../../errorHelpers/appError"
import { envVars } from "../../config/env"
import { generateJwtToken } from "../../utils/generateJwtToken"
import { User } from "../user/user.models"
import { IAuthenticatedRequest, JWTPayload } from "../../interfaces"
import { Request } from "express"
import { StatusCodes } from "http-status-codes"



// Get loged in user
const getLogedInUser = async(req: IAuthenticatedRequest) => {
    const email = req?.user?.email

    const logedInUser = await User.findOne({email}).select('fullName email profilePhoto status role -_id')

    if(!logedInUser){
        throw new AppError(StatusCodes.UNAUTHORIZED, 'User is unauthorized')
    }

    return logedInUser
}

// User login
const userLogin = async (payload: userLoginInput) => {
    const existingUser = await User.findOne({email: payload?.email})

    if(!existingUser){
        throw new AppError(400, 'User with this email not found.')
    }

    const isPasswordMatch = await bcrypt.compare(payload?.password, existingUser?.password as string)

    if (!isPasswordMatch) {
        throw new AppError(400, 'Password is incorrect')
    }

    // Generate access Token
    const accessToken = generateJwtToken(
        { email: existingUser?.email, role: existingUser?.role },
        envVars.JWT.JWT_ACCESS_SECRET,
        '1h'
    )

    // Generate refresh Token
    const refreshToken = generateJwtToken(
        { email: existingUser?.email, role: existingUser?.role },
        envVars.JWT.JWT_REFRESH_SECRET,
        '30d'
    )

    return {
        accessToken,
        refreshToken,
    }
}


export const AuthServices = {
    userLogin,
    getLogedInUser
}