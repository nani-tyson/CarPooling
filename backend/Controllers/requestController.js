import RideRequest from "../Models/RideRequest.js";
import Rides from "../Models/Ride.js";


export const requestRide = async (req, res) => {
  const { rideId } = req.body;
  const riderId = req.user.id;

  try {
    const ride = await Rides.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    // Check if already requested
    const existing = await RideRequest.findOne({ ride: rideId, rider: riderId });
    if (existing) return res.status(400).json({ message: "Already requested this ride" });

    const request = await RideRequest.create({
      ride: rideId,
      rider: riderId,
      routeMatchPercentage: 85 // Optional dummy value
    });

    res.status(201).json({ message: "Request sent", request });
  } catch (error) {
    console.error("Request Ride Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const respondToRequest = async (req, res) => {
  const { requestId } = req.params;
  const { action } = req.body; // "approved" or "rejected"

  try {
    const request = await RideRequest.findById(requestId).populate("ride");
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only the ride driver can approve/reject
    if (request.ride.driver.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    if (action === "approved") {
      request.status = "approved";

      const ride = await Rides.findById(request.ride._id);
      if (ride.availableSeats > 0) {
        ride.availableSeats -= 1;
        ride.approvedRiders.push(request.rider);
        await ride.save();
      } else {
        return res.status(400).json({ message: "No seats left" });
      }
    } else if (action === "rejected") {
      request.status = "rejected";
    }

    await request.save();
    res.status(200).json({ message: `Request ${action}`, request });
  } catch (error) {
    console.error("Respond Request Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
