import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  pickupLocation: {
    type: String,
    required: true
  },

  dropLocation: {
    type: String,
    required: true
  },

  departureDateTime: {
    type: Date,
    required: true
  },

  totalSeats: {
    type: Number,
    required: true
  },

  availableSeats: {
    type: Number,
    required: true
  },

  vehicleDetails: {
    carModel: String,
    licensePlate: String
  },

  preferences: {
    music: { type: Boolean, default: true },
    smoking: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    femaleOnly: { type: Boolean, default: false }
  },

  approvedRiders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  
  joinRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "RideRequest"
  }]
}, {
  timestamps: true
});

const Rides = mongoose.model("Ride", rideSchema);
export default Rides;
