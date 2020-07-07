import { Router, RequestHandler, Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from "../@types";

const signUp = (userRouter: Router) => userRouter.post('/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }

        const { email, password } = req.body;


        console.log('Creating user');
        res.status(201).send({ email, password })
    })

export default signUp;
