import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const menuSchema = new Schema(
	{
		prodId: {
			type: String,
			unique: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // legger automatisk til  createdAt og updatedAt nøkkel i objektene
		collection: 'menu', // gave collection in database name menu instead of menus, so forcing mongodb to look for singular "menu" instead in the database
	}
);

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);

export default Menu;
