import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

const jwtToken = process.env.JWT_TOKEN as string;

if (!jwtToken) {
    throw new Error("JWT_TOKEN is not defined in environment variables");
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get('Authorization'); 

    if (authHeader) {
        const bearer = authHeader.split(' ')[0].toLowerCase();
        const token = authHeader.split(' ')[1];

        if (token && bearer.startsWith('bearer')) {
            try {
                // Verify the token
                jwt.verify(token, jwtToken, (err, decoded) => {
                    if (err) {
                        // fail to authenticate user
                        return res.status(401).json({ 
                            redirect: "http://localhost:5173/", 
                            message: "Login to access" 
                        });
                    }

                    if (decoded && typeof decoded !== 'string') {
                        req.user = decoded as JwtPayload;  
                    } else {
                        req.user = undefined; 
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
