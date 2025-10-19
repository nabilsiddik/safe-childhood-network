import { Request } from "express";
import AppError from "../../errorHelpers/appError";
import bcrypt from 'bcrypt'
import { fileUploader } from "../../utils/fileUploder";
import { envVars } from "../../config/env";
import { User } from "./user.models";


// Get all users from db
// const getAllUsers = async (params: any, options: any) => {
//     const { page, limit, skip, sortOrder, sortBy } = calculatePagination(options)
//     const { searchTerm, ...filterData } = params

//     const andConditions: Prisma.UserWhereInput[] = []

//     if (searchTerm) {
//         andConditions.push({
//             OR: userSearchableFields.map((field) => ({
//                 [field]: {
//                     contains: searchTerm,
//                     mode: 'insensitive'
//                 }
//             }))
//         })
//     }

//     if(Object.keys(filterData).length > 0){
//         andConditions.push({
//             AND: Object.keys(filterData).map((key) => ({
//                 [key]: {
//                     equals: filterData[key]
//                 }
//             }))
//         })
//     }

//     const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
//         AND: andConditions
//     } : {}

//     const total = await prisma.user.count({
//         where: whereConditions
//     })

//     const result = await prisma.user.findMany({
//         skip,
//         take: limit,
//         where: whereConditions,
//         orderBy: {
//             [sortBy]: sortOrder
//         }
//     })

//     return {
//         meta: {
//             page,
//             limit,
//             total
//         },
//         data: result
//     }
// }


// Create user
const createUser = async (req: Request) => {

    if (req?.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.profilePhoto = uploadedResult?.secure_url
    }

    const { fullName, email, password: userPassword, confirmPassword } = req.body

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
}