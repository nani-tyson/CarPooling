import dotenv from "dotenv";
import express from "express";
import cors from "cors";   
import cookieParser from "cookie-parser"; 

import connectDB from "./Config/db.js";
import authRoutes from "./Routes/auth.js";
import rideRoutes from './Routes/rides.js';
import requestRoutes from './Routes/requests.js';

//confgures
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",  // 👈 your frontend URL
    credentials: true                // 👈 allow cookies
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()
const PORT = process.env.PORT || 5000

connectDB()

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/requests', requestRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})