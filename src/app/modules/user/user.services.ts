import AppError from "../../errorHelpers/appError";
import { User } from "./user.models";
import { applyQuery } from "../../utils/applyQuery";
import { IUser } from "./user.interfaces";

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


    return result
}

// Get user by email
const getUserByEmail = async(userEmail: string) => {

    const user = await User.findOne({email: userEmail})

    if(!user){
        throw new AppError(404, 'user not found')
    }

    return user
}


// Create user
const createUser = async (payload: IUser) => {
    const { fullName, email, profilePhoto } = payload

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new AppError(400, 'A user with this email already exist.')
    }

    // const hashedPassword = await bcrypt.hash(userPassword, Number(envVars.SALT_ROUND))

    const userData = {
        fullName,
        email,
        profilePhoto
    }

    const createdUser = await User.create(userData)
    const userObj = createdUser.toObject()
    const { password, ...resUser } = userObj

    return resUser
}



export const UserServices = {
    createUser,
    getAllUsers,
    getUserByEmail
}