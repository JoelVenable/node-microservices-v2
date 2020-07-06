import { Router, RequestHandler } from "express";


const signIn: RequestHandler = (req, res, next) => {
    res.send({ message: 'Sign in' })
}


export default signIn;
