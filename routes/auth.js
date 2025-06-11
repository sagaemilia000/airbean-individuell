import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { findUser, registerUser } from '../services/usersServices.js';
import { validateAuthBody } from '../middleware/validateAuthBody.js';
import { checkIfLoggedIn } from '../middleware/checkIfLoggedIn.js';

import { hashPassword, comparePassword, signToken } from '../utils/index.js';

const router = Router();

// ----> UPDATED <---- //

// REGISTER
router.post('/register', checkIfLoggedIn, validateAuthBody, async (req, res, next) => {
    const { username, password, role } = req.body;
    
    if (!role || (role !== 'user' && role !== 'admin')) {
        return next({
            status: 400,
            message: 'Role is required and must be either "user" or "admin"',
        });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const result = await registerUser({
            username,
            password: hashedPassword,
            role,
            userId: `user-${uuid().substring(0, 5)}`
        });
    
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: result.userId
        });
    } catch (error) {
        next(error);
    }
});

// LOGIN
router.post('/login', validateAuthBody, async (req, res, next) => {
    const { username, password } = req.body;

    const user = await findUser(username);

    if (!user) {
        return next({
            status: 400,
            message: 'Username or password are incorrect'
        });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        return next({
            status: 400,
            message: 'Username or password are incorrect'
        });
    }

    const token = signToken({
        username: user.username,
        role: user.role,
        userId: user.userId
    });

    const bearerToken = `Bearer ${token}`;

    return res.json({
        success: true,
        message: 'User logged in successfully',
        token: bearerToken
    });
});

// LOGOUT
// router.get('/logout', (req, res) => {
//     global.user = null; 
//     res.json({
//         success : true,
//         message : 'User logged out successfully'
//     });
// });

export default router;