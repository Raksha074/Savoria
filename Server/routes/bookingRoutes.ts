import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { cancelBooking, createBooking, getMyBookings } from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter.post("/", protect, createBooking)
bookingRouter.get("/my", protect, getMyBookings)
bookingRouter.put("/:id/cancel", protect, cancelBooking)

import { Booking } from "../models/Booking.js";
bookingRouter.get("/debug", async (req, res) => {
    const data = await Booking.find({});
    res.json(data);
});

export default bookingRouter;