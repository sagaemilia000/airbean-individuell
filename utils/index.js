// ----> NEW <---- //

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.MYSUPERSECRET || 'fallback-secret';

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
    const isSame = await bcrypt.compare(password, hashedPassword);
    return isSame;
}

export function signToken(payload) {
    const token = jwt.sign(
        payload,
        SECRET,
        { expiresIn: 60 * 60 } 
    );
    return token;
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded;
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return null;
    }
}