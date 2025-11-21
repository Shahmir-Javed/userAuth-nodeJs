import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';


const app = express();


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));


// CORS: allow your client origin
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


// rate limiter
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


// health
app.get('/health', (req, res) => res.send('ok'));


// error handler
app.use(errorHandler);


export default app;