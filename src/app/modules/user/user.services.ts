import { Request } from "express";
import AppError from "../../errorHelpers/appError";
import bcrypt from 'bcrypt'
import { fileUploader } from "../../utils/fileUploder";
import { envVars } from "../../config/env";
import { User } from "./user.models";
import { applyQuery } from "../../utils/applyQuery";

// Get all users
const getAllUsers = (options: Record<string, any>) => {

    const queryOptions = {
        page: Number(options.page) || 1,
        limit: Number(options.limit) || 10,
        sortField: options.sortField as string || 'createdAt',
        sortOrder: (options.sortOrder === 'asc' ? 'asc' : 'desc') as 'asc' | 'desc',
        search: options.search as string || '',
        searchFields: ['fullName', 'email'],
        filter: {} as Record<string, any>
    }

    if(options.role) queryOptions.filter.role = options.role
    if(options.status) queryOptions.filter.status = options.status

    const result = applyQuery(User, queryOptions)

    console.log(result)

    return result
}

// Create user
const createUser = async (req: Request) => {

    // if (req?.file) {
    //     const uploadedResult = await fileUploader.uploadToCloudinary(req.file)
    //     req.body.profilePhoto = uploadedResult?.secure_url
    // }

    const { fullName, email, password: userPassword } = req.body

    console.log({
        fullName,
        email,
        userPassword
    })

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new AppError(400, 'A user with this email already exist.')
    }

    const hashedPassword = await bcrypt.hash(userPassword, Number(envVars.SALT_ROUND))

    const userData = {
        fullName,
        email,
        password: hashedPassword
    }

    const createdUser = await User.create(userData)
    const userObj = createdUser.toObject()
    const { password, ...resUser } = userObj

    return resUser
}



export const UserServices = {
    createUser,
    getAllUsers
}