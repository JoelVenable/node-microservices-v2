import { Router, RequestHandler } from "express";




const signOut = (userRouter: Router) => userRouter.post('/signout', (req, res, next) => {
    res.send({ message: 'Sign out' })
})





export default signOut;
