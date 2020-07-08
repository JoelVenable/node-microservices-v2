import { Router, RequestHandler } from "express";
import { TokenService } from "../services";
import { User } from "../models";
import { UnauthorizedError } from "../@types";

const currentUser = (userRouter: Router) => userRouter.get('/currentuser', async (req, res, next) => {
    try {
        const { jwt } = req.session!;
        const currentUser = TokenService.verify(jwt)
        res.send({ currentUser })
    } catch (err) {
        console.log(err)
        res.send({ currentUser: null })
    }
})

export default currentUser;
