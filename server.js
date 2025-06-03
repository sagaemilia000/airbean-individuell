import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.js';
import authRouter from './routes/auth.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

app.use(express.json());

app.use('/api/auth', authRouter)

database.on('error', (error) => console.log(error));

database.once('connected', () => {
    console.log('DB connected');
    app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`)
    })
})

app.use(errorHandler)
