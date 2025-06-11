import { Router } from 'express';
import Menu from '../models/menu.js';
import { createProduct, updateProduct, deleteProduct } from '../services/menuServices.js';
import { checkIfAdmin } from '../middleware/checkIfAdmin.js';
import { v4 as uuid } from 'uuid';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/', async (req, res, next) => {
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


// ----> NEW <---- //

// POST new product
router.post('/', authenticate, checkIfAdmin, async (req, res, next) => {
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

// PUT product
router.put('/:prodId', authenticate, checkIfAdmin, async (req, res, next) => {
	const { prodId } = req.params;
    const { title, desc, price } = req.body;

    if (title && desc && price) {
        const result = await updateProduct(prodId, {
            title,
            desc,
            price,
			modifiedAt: new Date()
        });

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                updatedProduct: result
            });
        } else {
            next({
                status: 400,
                message: 'Product could not be updated'
            });
        }
    } else {
        next({
            status: 400,
            message: 'Title, description, and price are required'
        });
    }
});

// DELETE product
router.delete('/:prodId', authenticate, checkIfAdmin, async (req, res, next) => {
    const { prodId } = req.params;

    try {
        const result = await deleteProduct(prodId);

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
            });
        } else {
            next({
                status: 404,
                message: 'Product not found'
            });
        }
    } catch (error) {
        next({
            status: 500,
            message: 'An error occurred while trying to delete the product'
        });
    }
});


export default router;
