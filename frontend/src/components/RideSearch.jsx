import React, { useState } from "react";
import api from "../api/axios";

const RideSearch = () => {
  const [form, setForm] = useState({ pickup: "", drop: "", departureTime: "" });
  const [rides, setRides] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/rides/search", { 
        params: {
          pickup: form.pickup,
          drop: form.drop,
          departureTime: form.departureTime
        }
      });
      console.log("Search response:", res.data);
      
      if (res.data?.rides && Array.isArray(res.data.rides)) {
        setRides(res.data.rides);
      } else {
        setRides([]);
        if (res.data?.message) {
          setError(res.data.message);
        } else {
          setError("No rides found matching your criteria");
        }
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError(err.response?.data?.message || "Failed to search rides");
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (rideId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/requests/join", { rideId });
      if (res.data.success) {
        alert("Ride request sent successfully!");
        // Refresh requests list
        const updatedRequests = await api.get('/rides/driver/requests');
        setRequests(updatedRequests.data.requests);
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError(err.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-2 mb-4">
        <input name="pickup" placeholder="Pickup" onChange={handleChange} className="p-2 border rounded" />
        <input name="drop" placeholder="Drop" onChange={handleChange} className="p-2 border rounded" />
        <input type="datetime-local" name="departureTime" onChange={handleChange} className="p-2 border rounded" />
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && !rides.length && (
        <div className="text-center py-4">Searching for rides...</div>
      )}
      {!loading && error && (
        <div className="text-red-500 p-2 bg-red-100 rounded mb-4">
          {error}
        </div>
      )}
      {!loading && rides.length === 0 && !error && (
        <div className="text-center py-4">
          No rides found. Try adjusting your search criteria.
        </div>
      )}
      {rides.map((ride) => (
        <div key={ride._id} className="border p-4 rounded bg-gray-100 mb-2">
          <h3 className="font-bold">{ride.pickupLocation} ➜ {ride.dropLocation}</h3>
          <p>Driver: {ride.driver?.name}</p>
          <p>Phone: {ride.driver?.phone}</p>
          <p>Departure: {new Date(ride.departureDateTime).toLocaleString()}</p>
          <p>Available Seats: {ride.availableSeats}</p>
          
          <button 
            onClick={() => handleRequest(ride._id)} 
            disabled={loading}
            className={`mt-2 px-3 py-1 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
          >
            {loading ? 'Sending...' : 'Request Ride'}
          </button>
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ))}
    </>
  );
};

export default RideSearch;
