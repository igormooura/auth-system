import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

const handleUnauthorizedError = (next: NextFunction): void => {
    const error = new HttpError('Login error', 401);
    next(error);
};

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get('Authorization') // get authHeader -> check if it's valid 

    if (authHeader) {
        const bearer = authHeader.split(' ')[0].toLowerCase();
        const token = authHeader.split(' ')[1];

        if (bearer && token === 'bearer') {
            const decode = jwt.verify(token, 'segredo_demais');

            if (decode) {
                next()
            } else {
                // fail to authenticate user
                handleUnauthorizedError(next)
            }
        } else {
            // token type not bearer
            handleUnauthorizedError(next);
        }
    } else {
        //no token
        handleUnauthorizedError(next)
    }
    try {

    } catch (error) {
        handleUnauthorizedError(next)
    }

}

export default authMiddleware