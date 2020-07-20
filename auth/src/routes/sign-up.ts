import { Router, Request, Response, NextFunction } from "express";
import { body } from 'express-validator'
import { HttpError, validateParams, TokenService } from "@jdvtickets/common";
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
    validateParams,
    async (req: Request, res: Response, next: NextFunction) => {

        const { email, password } = req.body;
        const found = await User.findOne({ email });

        if (found) {
            throw new HttpError(400, 'User already exists')
        }


        const user = await User.create({ email, password })

        // @ts-ignore
        const jwt = TokenService.sign(user);
        req.session = { jwt }
        res.status(201).send(user.toJSON())

    })

export default signUp;
