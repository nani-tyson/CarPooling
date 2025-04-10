import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome to CoDrive 🚗</h1>
        <p className="text-gray-600 mb-8">Please sign in or sign up to continue.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-blue-500 text-blue-500 py-2 rounded hover:bg-blue-50"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
