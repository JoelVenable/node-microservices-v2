import { Router } from "express";

const signOut = (userRouter: Router) => userRouter.post('/signout', (req, res, next) => {
    req.session = null
    res.status(204).send()
})

export default signOut;
