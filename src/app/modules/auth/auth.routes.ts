import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import { checkAuth } from "../../middlewares/checkauth";
import { UserRole } from "../user/user.interfaces";

const authRouter = Router()

authRouter.get('/me', checkAuth(...Object.keys(UserRole)), AuthControllers.getLogedInUser)
authRouter.post('/login', AuthControllers.userLogin)
// authRouter.post('/logout', AuthControllers.userLogout)


export default authRouter 