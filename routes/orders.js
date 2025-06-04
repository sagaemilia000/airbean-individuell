<<<<<<< HEAD
import { Router } from 'express';
import {
	getAllOrders,
	getOrdersByUser,
	createOrderFromCart,
} from '../services/ordersServices.js';
=======
import { Router } from "express";
import Order from "../models/order.js";
import { v4 as uuidv4 } from "uuid";
import Cart from "../models/cart.js";
import Menu from "../models/menu.js";
>>>>>>> 10-cleaning-cart

const router = Router();

// ----------------------------------------------------------------------------------------

<<<<<<< HEAD
// (GET) - RETURNS ALL ORDERS BY ALL USERS/GUESTS
router.get('/orders', async (req, res, next) => {
	try {
		const allOrders = await getAllOrders();
		res.status(200).json({
			success: true,
			message: 'These are all the orders that exist:',
			data: allOrders,
		});
	} catch (error) {
		next({
			status: 500,
			message: 'Failed fetching orders - server error.',
		});
	}
=======
// ADMIN (GET) - RETURNS ALL ORDERS BY ALL USERS/GUESTS
router.get("/orders", async (req, res) => {
  const allOrders = await Order.find();
  res.json({
    message: "These are all the orders by all the users",
    data: allOrders,
  });
>>>>>>> 10-cleaning-cart
});

// ----------------------------------------------------------------------------------------

<<<<<<< HEAD
// (GET) - RETURNS ALL ORDERS FOR THAT USER/ID
router.get('/orders/:userId', async (req, res, next) => {
	try {
		const { userId } = req.params;
		const personalOrders = await getOrdersByUser(userId);

		if (!personalOrders.length) {
			return next({
				status: 404,
				message: 'This user does not have any orders',
			});
		}

		res.status(200).json({
			success: true,
			message: 'These are all the orders for this specific user',
			data: personalOrders,
		});
	} catch (error) {
		next({
			status: 500,
			message: 'Failed fetching orders - server error.',
		});
	}
=======
// USER (GET) - RETURNS ALL ORDERS FOR THAT USER/ID
router.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  const personalOrders = await Order.find({ userId });
  res.json({
    message: "These are all the orders for this spesific user",
    data: personalOrders,
  });
>>>>>>> 10-cleaning-cart
});

// ----------------------------------------------------------------------------------------

// (POST) - CREATES ORDER FOR CART(id) RECEIVED IN REQ.BODY (or guest order if not)
// ORDER IS SENT BACK TO THE USER IN THE RESPONSE

<<<<<<< HEAD
router.post('/orders', async (req, res, next) => {
	try {
		let { cartId } = req.body;

		if (!cartId) {
			return next({
				status: 400,
				message: 'you need a cartId to see orders',
			});
		}

		const newOrder = await createOrderFromCart(cartId);

		res.status(201).json({
			success: true,
			message: 'Order created!',
			data: newOrder,
			// order (newOrder) returns to user
		});
	} catch (error) {
		next({ status: 500, message: 'Could not create order - server error' });
	}
=======
router.post("/orders", async (req, res) => {
  let { cartId } = req.body;
  // hämter userId & items-arrayen från req.body AKA cart -- om cart inte finns/ingen items skapas et guestId
  if (!cartId) {
    return res.status(400).json({ success: false, message: "cartId krävs" });
  }
  const cart = await Cart.findOne({ cartId });
  console.log(cart);
  if (!cart) {
    return res.status(400).json({ success: false, message: "could not find cart" });
  }

  // Hämta alla prodId från cartens produkter
  const prodIds = cart.products.map((item) => item.prodId);

  // Hämta rätt produkter från Menu-kollektionen
  const menuItems = await Menu.find({ prodId: { $in: prodIds } });

  // Skapa en lookup-tabell för priser
  const priceMap = {};
  menuItems.forEach((menuItem) => {
    priceMap[menuItem.prodId] = menuItem.price;
  });

  // Räkna ut totalsumman baserat på priceMap och cartens qty
  const total = cart.products.reduce((sum, item) => {
    const price = priceMap[item.prodId] || 0;
    return sum + price * item.qty;
  }, 0);

  // const menu = await Menu.find({ price });
  // if (!menu) {
  // 	return res
  // 		.status(400)
  // 		.json({ success: false, message: 'could not find menu' });
  // }

  // const total = cart.products.reduce(
  // 	(sum, item) => sum + item.price * item.qty,
  // 	0
  // );
  // console.log(products);
  // If no userId is provided, generate a guest ID

  const newOrder = new Order({
    // Vid POST-anrop måste man specifikt säga vad som ska finnas med i ordern.
    // Det finns redan en blueprint (Schema), men vid POST måste man ändå
    // säga till koden att "det här måste du faktiskt ha med".

    orderId: "order-" + uuidv4().slice(0, 5),
    userId: cart.userId,
    cartId: cart.cartId,
    products: cart.products,
    total,
  });

  // router.post('/orders', async (req, res) => {
  // let { total, orderId, cartId, userId, products } = req.body;
  // // hämter userId & items-arrayen från req.body AKA cart -- om cart inte finns/ingen items skapas et guestId
  // if (cartId) {
  // 	if (!orderId) {
  // 		orderId = 'order-' + uuidv4().slice(0, 5);
  // 		// om userId inte finns, ger dig en guestId
  // 	} else {
  // 	}

  // 	const total = products.reduce(
  // 		(sum, item) => sum + item.price * item.qty,
  // 		0
  // 	);
  // }
  // // If no userId is provided, generate a guest ID

  // const newOrder = new Order({
  // 	// Vid POST-anrop måste man specifikt säga vad som ska finnas med i ordern.
  // 	// Det finns redan en blueprint (Schema), men vid POST måste man ändå
  // 	// säga till koden att "det här måste du faktiskt ha med".
  // 	orderId,
  // 	userId,
  // 	cartId,
  // 	products,
  // 	total,
  // });

  await newOrder.save();
  // sparar den nya beställningen

  res.json({
    message: "Order created!",
    data: newOrder,
    // order skickas tillbaka til användaren här
  });
>>>>>>> 10-cleaning-cart
});

export default router;
