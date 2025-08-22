import express from 'express';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5174', 
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// If you add userRoutes later, uncomment and import it
// import userRoutes from './routes/user.route.js';
// app.use("/api/users", userRoutes);

export default app;
