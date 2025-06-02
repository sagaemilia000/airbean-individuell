import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8070;

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
