import { Router } from 'express';
import Menu from '../models/menu.js';

const router = Router();

// call authUser? --> if logged in THEN we can fetch the menu (?)

router.get('/menu', async (req, res) => {
	const menu = await Menu.find();
	res.json({ message: 'This is the menu', data: menu });
});

export default router;
