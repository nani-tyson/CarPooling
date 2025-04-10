import React from "react";
import NavbarRider from "../components/NavbarRider";

const RiderLayout = ({ children }) => {
  return (
    <>
      <NavbarRider />
      <div className="pt-20 p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          {children}
        </div>
      </div>
    </>
  );
};

export default RiderLayout;
