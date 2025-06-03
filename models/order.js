import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			// inte required, om man vill beställa som guest
		},
		guestId: {
			type: String,
			// använder guestId om userId inte finns (logiken finns i routes - orders.js)
		},
		items: [
			{
				prodId: String,
				cartId: String,
				qty: Number,
				title: String,
				price: Number,
			},
		],
		total: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
