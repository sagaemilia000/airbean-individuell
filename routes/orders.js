import { Router } from 'express';
import Order from '../models/order.js';

const router = Router();

// ----------------------------------------------------------------------------------------

// ADMIN (GET) - RETURNS ALL ORDERS BY ALL USERS/GUESTS
router.get('/orders', async (req, res) => {
	const allOrders = await Order.find();
	res.json({
		message: 'These are all the orders by all the users',
		data: allOrders,
	});
});

// ----------------------------------------------------------------------------------------

// USER (GET) - RETURNS ALL ORDERS FOR THAT USER/ID
router.get('/orders/:userId', async (req, res) => {
	const { userId } = req.params;
	const personalOrders = await Order.find({ userId });
	res.json({
		message: 'These are all the orders for this spesific user',
		data: personalOrders,
	});
});

// ----------------------------------------------------------------------------------------

// USER (POST) - CREATES ORDER FOR CART RECEIVED IN REQ.BODY - CREATES ORDER
// ORDER IS SENT BACK TO THE USER IN THE RESPONSE

// router.post('/orders', async (req, res) => {
// 	const newOrder = await Order.find();
// 	res.json({
// 		message: 'I made a new order! This is it:',
// 		data: newOrder,
// 	});
// POST = sender inn en ny order - sender inn cartId (handlekurv med egen ID
// knyttet til userID, carten har produkter i seg) - leter etter den carten
// og dens innhold/pris/antall OSV... - lager en ny order basert på *DEN* carten
// TLDR: vi kan altså gjøre et POST anrop - lage ny order - mha cartID!
// REPONSE = den nye orderen returneres - så klienten/frontenden kommer "åt" det
// });

export default router;
// ----------------------------------------------------------------------------------------
// ADMIN -->
// Method: GET
// URL: /api/orders
// Description: Returns all orders

// USER -->
// Method: GET
// URL: /api/orders/{userId}
// Description: Returns all orders connected to the userId sent in request params.

// USER -->
// Method: POST
// URL: /api/orders
// Description: Targets the cart received in request body and creates an order.
// The order is then sent back to the user in the response.
// Body:
// {
//   "cartId" : <cartId>
// }
