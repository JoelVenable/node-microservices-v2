import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator'
import { RequestValidationError, HttpError } from "../@types";
import { User } from '../models';
import jwt from 'jsonwebtoken';
import validateParams from "../services/validateParams";

const { JWT_SIGNING_KEY } = process.env;
if (typeof JWT_SIGNING_KEY !== 'string') throw new Error('Missing environment variable!')


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
        validateParams(req);

        const { email, password } = req.body;
        const found = await User.findOne({ email });

        if (found) {
            throw new HttpError(400, 'User already exists!')
        }


        const user = await User.create({ email, password })

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, JWT_SIGNING_KEY)

        req.session = { jwt: userJwt }
        res.status(201).send(user.toJSON())

    })

export default signUp;
