import express from  "express";
import cookieParser  from 'cookie-parser';
import connectDB  from './db/connect.js';
import authRoutes  from './routes/auth.router.js';
import eventRoutes  from './routes/event.router.js';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config({
    path:'./.env'
})

const app = express();
app.use(cors({
    origin: '*',
  }))
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

  


export default app;
