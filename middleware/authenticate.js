// ----> NEW <---- //

import { verifyToken } from '../utils/index.js';

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 
            message: 'Authorization header missing' 
        });
    }

    const token = authHeader.split(' ')[1]; 

    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ 
            message: 'Invalid or expired token' 
        });
    }

    req.user = decoded;
    next();
}