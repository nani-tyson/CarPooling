import express from "express";
import { 
  createRide, 
  getAllRides, 
  searchRides, 
  getDriverRides,
  getDriverRequests,
  updateRequestStatus 
} from "../Controllers/rideController.js";
import protect from "../Middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", protect, createRide);      // Create a ride
router.get("/", protect, getAllRides);      // Public ride listing
router.get("/search", protect, searchRides);
router.get("/driver", protect, getDriverRides);
router.get("/driver/requests", protect, getDriverRequests);
router.patch("/requests/:id", protect, updateRequestStatus);

export default router;
