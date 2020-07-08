import { Request } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../@types";



const validateParams = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
}

export default validateParams;
