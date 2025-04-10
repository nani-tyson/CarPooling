import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      const { user } = res.data;
      
      // Clear all previous user data and store current user with type
      localStorage.removeItem('user_driver');
      localStorage.removeItem('user_rider');
      localStorage.setItem('current_user', JSON.stringify({
        ...user,
        userType: user.isDriver ? 'driver' : 'rider'
      }));

      // Navigate to dashboard
      if (user.isDriver) {
        navigate("/driver");
      } else {
        navigate("/rider");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Login</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">
            {error}{" "}
            <button onClick={() => navigate("/login")} className="text-blue-500 underline ml-1">
              Login
            </button>
          </p>
        )}

        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone"
          value={form.emailOrPhone}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
