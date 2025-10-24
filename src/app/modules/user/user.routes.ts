import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controllers";
import { UserValidation } from "./user.validation";
import { fileUploader } from "../../utils/fileUploder";
import { checkAuth } from "../../middlewares/checkauth";
import { UserRole } from "./user.interfaces";

const userRouter = Router()


// Get all users 
userRouter.get('/', checkAuth(UserRole.ADMIN), UserControllers.getAllUsers)

// Get user by email
userRouter.get('/:userEmail', UserControllers.getUserByEmail)

// Create user route
userRouter.post('/', UserControllers.createUser)



export default userRouter