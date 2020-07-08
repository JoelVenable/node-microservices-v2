import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateParams } from "../middlewares";


const signIn = (userRouter: Router) => userRouter.post('/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password!')
],
    validateParams,
    (req: Request, res: Response, next: NextFunction) => {

    })


export default signIn;
