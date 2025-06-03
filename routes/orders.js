import { Router } from 'express';
import Order from '../models/order.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// HUSK Å LEGGE TIL FEILMELDINGER / STATUS / ERROR-CODES / FEILHÅNDTERING OSV

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

// USER (POST) - CREATES ORDER FOR CART(id) RECEIVED IN REQ.BODY (or guest order if not)
// ORDER IS SENT BACK TO THE USER IN THE RESPONSE

router.post('/orders', async (req, res) => {
	let { userId, items } = req.body;
	// hämter userId & items-arrayen från req.body AKA cart -- om cart inte finns/ingen items skapas et guestId

	// If no userId is provided, generate a guest ID
	if (!userId) {
		userId = 'guest-' + uuidv4().slice(0, 5);
		// om userId inte finns, ger dig en guestId
	} else {
	}

	const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
	// calculates all prices in total

	const newOrder = new Order({
		// Vid POST-anrop måste man specifikt säga vad som ska finnas med i ordern.
		// Det finns redan en blueprint (Schema), men vid POST måste man ändå
		// säga till koden att "det här måste du faktiskt ha med".
		userId,
		items,
		total,
	});

	await newOrder.save();
	// sparar den nya beställningen

	res.json({
		message: 'Order created!',
		data: newOrder,
		// order skickas tillbaka til användaren här
	});
});

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
