import Rides from "../Models/Ride.js";

export const createRide = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropLocation,
      departureDateTime,
      totalSeats,
      vehicleDetails,
      preferences
    } = req.body;

    const ride = new Rides({
      driver: req.user.id, // comes from auth middleware
      pickupLocation,
      dropLocation,
      departureDateTime,
      totalSeats,
      availableSeats: totalSeats,
      vehicleDetails,
      preferences
    });

    await ride.save();
    res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    console.error("Ride creation error:", error);
    res.status(500).json({ message: "Server error while creating ride" });
  }
};

export const getAllRides = async (req, res) => {
  try {
    const rides = await Rides.find()
      .populate("driver", "name gender")
      .sort({ departureDateTime: 1 });
    res.status(200).json(rides);
  } catch (error) {
    console.error("Get Rides Error:", error);
    res.status(500).json({ message: "Error fetching rides" });
  }
};


export const searchRides = async (req, res) => {
  try {
    console.log("Search rides request received:", req.query);
    
    const { pickup, drop, departureTime } = req.query;

    if (!pickup || !drop || !departureTime) {
      console.warn("Missing search parameters");
      return res.status(400).json({ 
        message: "Missing search parameters",
        required: ["pickup", "drop", "departureTime"] 
      });
    }

    // Validate and parse departure time
    const userTime = new Date(departureTime);
    if (isNaN(userTime.getTime())) {
      console.warn("Invalid departure time format");
      return res.status(400).json({ message: "Invalid departure time format" });
    }

    const timeWindow = 2 * 60 * 60 * 1000; // 2 hours
    const lower = new Date(userTime.getTime() - timeWindow);
    const upper = new Date(userTime.getTime() + timeWindow);

    console.log(`Searching rides between ${lower} and ${upper}`);

    // Find rides with available seats in time window
    const rides = await Rides.find({
      departureDateTime: { $gte: lower, $lte: upper },
      availableSeats: { $gt: 0 }
    })
    .populate("driver", "name gender phone")
    .lean();

    console.log(`Found ${rides.length} potential rides`);

    // Score and sort rides
    const results = rides.map((ride) => {
      const pickupMatch = similarity(pickup, ride.pickupLocation);
      const dropMatch = similarity(drop, ride.dropLocation);
      const routeMatchPercentage = Math.round((pickupMatch + dropMatch) / 2 * 100);

      return {
        ...ride,
        routeMatchPercentage
      };
    })
    .sort((a, b) => b.routeMatchPercentage - a.routeMatchPercentage);

    console.log(`Returning ${results.length} matching rides`);
    res.status(200).json({ rides: results }); // Return as object with rides array
  } catch (error) {
    console.error("Search Rides Error:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ 
      message: "Failed to search rides",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Similarity function
const similarity = (a, b) => {
  if (!a || !b) return 0;
    a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.75;
  return 0.5;
};

export const getDriverRequests = async (req, res) => {
  try {
    const rides = await Rides.find({ driver: req.user.id })
      .populate({
        path: "joinRequests",
        populate: {
          path: "rider",
          select: "name"
        }
      });
    
    const requests = rides.flatMap(ride => 
      ride.joinRequests.map(req => ({
        ...req._doc,
        ride: {
          pickupLocation: ride.pickupLocation,
          dropLocation: ride.dropLocation
        }
      }))
    );

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Get Driver Requests Error:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await RideRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    console.error("Update Request Error:", error);
    res.status(500).json({ message: "Failed to update request" });
  }
};

export const getDriverRides = async (req, res) => {
  try {
    console.log("Fetching rides for driver:", req.user.id);
    
    if (!req.user?.id) {
      console.error("No user ID in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const rides = await Rides.find({ driver: req.user.id })
      .populate({
        path: "joinRequests",
        select: "status createdAt",
        populate: {
          path: "rider",
          select: "name email"
        }
      })
      .sort({ departureDateTime: -1 });

    console.log(`Found ${rides.length} rides for driver ${req.user.id}`);
    
    res.status(200).json({ rides });
  } catch (error) {
    console.error("Get Driver Rides Error:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ 
      message: "Failed to fetch rides",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
