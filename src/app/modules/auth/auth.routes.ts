import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const authRouter = Router()

authRouter.post('/login', AuthControllers.userLogin)
authRouter.post('/logout', AuthControllers.userLogout)


export default authRouter 