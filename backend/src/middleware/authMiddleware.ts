import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    const authHeader = req.get('Authorization') 

    if (authHeader) {
        const bearer = authHeader.split(' ')[0].toLowerCase();
        const token = authHeader.split(' ')[1];

        if (token && bearer === 'bearer') {
            try {
                // Verify the token
                jwt.verify(token, process.env.JWT_SECRET || 'segredo_demais', (err, decoded) => {
                    if (err) {
                        // fail to authenticate user
                        return res.status(401).json({ 
                            redirect: "http://localhost:5173/", 
                            message: "Login to access" 
                        });
                    }
                    next();
                });
            } catch (error) {
                // Catch any other errors
                handleUnauthorizedError(next);
            }
        } else {
            // token type not bearer
            handleUnauthorizedError(next);
        }
    } else {
        // no token
        handleUnauthorizedError(next);
    }
}

export default authMiddleware;
