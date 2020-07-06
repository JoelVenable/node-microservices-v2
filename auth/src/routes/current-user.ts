import { Router, RequestHandler } from "express";

const currentUser: RequestHandler = (req, res, next) => {
    res.send({ message: 'Current User' })
}

export default currentUser;
