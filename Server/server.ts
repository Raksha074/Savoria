import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";



const app = express();

// connect to MongoDB
await connectDB()



const port = process.env.PORT || 5000;

// Connect to MongoDB and start the server
try {
    await connectDB();
    app.use(cors());
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Server is Live!');
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
} catch (error) {
    console.error('Server startup aborted because MongoDB connection failed.');
    process.exit(1);
}

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/auth", authRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/bookings", bookingRouter);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal Server Error", stack: process.env.NODE_ENV === "production" ? undefined : err.stack });
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});