import { Router } from 'express';
import Menu from '../models/menu.js';
import { createProduct } from '../services/menuServices.js';
import { checkIfAdmin } from '../middleware/checkIfAdmin.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/menu', async (req, res, next) => {
	try {
		const menu = await Menu.find();
		res.status(200).json({
			success: true,
			message: 'This is the menu:',
			data: menu,
		});
	} catch (error) {
		next({
			status: 500,
			message: 'Failed to fetch menu - server error.',
		});
	}
});

router.post('/menu', checkIfAdmin, async (req, res, next) => {
    const { title, desc, price } = req.body;
    
	if(title && desc && price) {
        const result = await createProduct({
            prodId: `prod-${uuid().substring(0, 5)}`,
			title,
			desc,
			price,
        })
        if(result) {
            res.status(201).json({
                success : true,
                message : 'New product created successfully'
            })
        } else {
            next({
                status : 400,
                message : 'New product could not be created'
            })
        }
    } else {
        next({
            status : 400,
            message : 'Title, description and price are required'
        })
    }
});

export default router;
