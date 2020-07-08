import { Router } from "express";
import { UserRequest, currentUser as currentUserMW } from "../middlewares";

const currentUser = (userRouter: Router) => userRouter.get('/currentuser', currentUserMW, async (req: UserRequest, res) => {
    res.send({ currentUser: req.currentUser ?? null })
})

export default currentUser;
