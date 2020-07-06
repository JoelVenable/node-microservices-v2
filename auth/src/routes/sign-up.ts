import { Router, RequestHandler } from "express";




const signUp: RequestHandler = (req, res, next) => {
    res.send({ message: 'Sign up' })
}

export default signUp;
