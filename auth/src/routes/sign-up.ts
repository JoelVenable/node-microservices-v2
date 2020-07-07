import { Router, RequestHandler, Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator'
import { RequestValidationError, HttpError } from "../@types";
import { User } from '../models';

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
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }

        const { email, password } = req.body;
        const found = await User.findOne({ email });

        if (found) {
            console.log(found)
            throw new HttpError(400, 'User already exists!')
        }

        try {
            const user = await User.create({ email, password })
            res.status(201).send(user.toJSON())
        } catch (e) {
            console.log(e)
        }
    })

export default signUp;
