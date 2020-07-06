import { Router, RequestHandler } from "express";


const signIn = (userRouter: Router) => userRouter.post('/signin', (req, res, next) => {
    res.send({ message: 'Sign in' })
})


export default signIn;
