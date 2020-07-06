import { Router, RequestHandler } from "express";

const currentUser = (userRouter: Router) => userRouter.get('/currentuser', (req, res, next) => {
    res.send({ message: 'Current User' })
})

export default currentUser;
