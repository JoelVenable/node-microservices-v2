import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateParams, UnauthorizedError, CryptoService, TokenService } from "@jdvtickets/common";
import { User } from '../models'


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
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) throw new UnauthorizedError()
        const isMatch = await CryptoService.compare({ stored: user.password, supplied: password })
        if (!isMatch) throw new UnauthorizedError()

        // @ts-ignore
        const jwt = TokenService.sign(user);
        req.session = { jwt }
        res.send(user.toJSON())
    })


export default signIn;
