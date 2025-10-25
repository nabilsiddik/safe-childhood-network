import {  Router } from "express";
import { UserControllers } from "./user.controllers";


const userRouter = Router()


// Get all users 
userRouter.get('/', UserControllers.getAllUsers)

// Get user by email
userRouter.get('/:userEmail', UserControllers.getUserByEmail)

// Create user route
userRouter.post('/', UserControllers.createUser)



export default userRouter