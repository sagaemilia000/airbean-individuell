import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		userId: String,
		items: [
			{
				prodId: String,
				qty: Number,
				title: String,
				price: Number,
			},
		],
		total: Number,
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
