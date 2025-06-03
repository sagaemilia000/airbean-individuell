import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu.js';
import ordersRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

app.use(express.json());
app.use(logger);

// ROUTES
app.use('/api', menuRoutes);
app.use('/api', ordersRoutes);

database.once('connected', () => {
	// once = når vi er -- connected; logger den ut at vi er connected til databasen
	console.log('database is successfully connected! :-)');
	app.listen(PORT, () => {
		console.log(`RUNNING ON PORT ${PORT}`);
	});
});
