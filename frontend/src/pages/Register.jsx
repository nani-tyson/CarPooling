import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    isDriver: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      const { isDriver } = res.data.user;
      navigate(isDriver ? "/driver" : "/rider");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
        <input name="gender" placeholder="Gender" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

        <label className="text-sm flex items-center mb-4">
          <input type="checkbox" name="isDriver" onChange={handleChange} className="mr-2" />
          Register as a Driver
        </label>

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
