import z from 'zod'
import { Gender } from './user.interfaces'

// patient creation input zod schema
const createUserValidationSchema = z.object({
    fullName: z.string('Full Name is required'),
    email: z.email('Email is required'),
    password: z.string().min(6, 'Password length must be at least 6').max(12, 'Password length must be maximum 12'),
    address: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
        error: 'Gender is required'
    }).optional(),
    profilePhoto: z.string().optional()
})


export const UserValidation = {
    createUserValidationSchema,
}
