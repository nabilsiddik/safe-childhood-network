import { Router } from "express";
import userRouter from "../modules/user/user.routes";
import authRouter from "../modules/auth/auth.routes";
import conversationRoute from "../modules/conversation/conversation.routes";
import messageRouter from "../modules/message/message.routes";

export const router = Router()

const moduleRoutes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/conversation',
        route: conversationRoute
    },
    {
        path: '/message',
        route: messageRouter
    }
]


moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

