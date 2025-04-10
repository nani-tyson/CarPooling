import express from "express";
import { requestRide, respondToRequest } from "../Controllers/requestController.js";
import protect from "../Middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/join", protect, requestRide);
router.put("/:requestId", protect, respondToRequest); // approve/reject

export default router;
