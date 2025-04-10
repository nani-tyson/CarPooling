import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import DriverLayout from "../layouts/DriverLayout";

const CreateRide = ({ onRideCreated }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    departureDateTime: "",
    totalSeats: 1,
    vehicleDetails: { carModel: "", licensePlate: "" },
    preferences: {
      music: false,
      smoking: false,
      petsAllowed: false,
      femaleOnly: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in form.preferences) {
      setForm({ ...form, preferences: { ...form.preferences, [name]: checked } });
    } else if (name in form.vehicleDetails) {
      setForm({ ...form, vehicleDetails: { ...form.vehicleDetails, [name]: value } });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/rides", form, { withCredentials: true });
      alert("Ride created successfully!");
    } catch (err) {
      alert("Failed to create ride.");
      console.error(err);
    }
  };

  return (
    <DriverLayout>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Create a New Ride</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="pickupLocation" placeholder="Pickup" className="p-2 border rounded" onChange={handleChange} required />
        <input name="dropLocation" placeholder="Drop" className="p-2 border rounded" onChange={handleChange} required />
        <input type="datetime-local" name="departureDateTime" className="p-2 border rounded" onChange={handleChange} required />
        <input type="number" name="totalSeats" min={1} className="p-2 border rounded" onChange={handleChange} required />
        <input name="carModel" placeholder="Car Model" className="p-2 border rounded" onChange={handleChange} required />
        <input name="licensePlate" placeholder="License Plate" className="p-2 border rounded" onChange={handleChange} required />
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(form.preferences).map((pref) => (
            <label key={pref} className="flex items-center gap-2">
              <input type="checkbox" name={pref} checked={form.preferences[pref]} onChange={handleChange} />
              {pref}
            </label>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Create Ride
        </button>
      </form>
    </DriverLayout>
  );
};

export default CreateRide;
