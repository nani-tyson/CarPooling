import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DriverDashboard from "./pages/DriverDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import CreateRide from "./pages/CreateRide";
import MyRequests from "./pages/MyRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/driver/create" element={<CreateRide />} />
        <Route path="/rider" element={<RiderDashboard />} />
        <Route path="/rider/requests" element={<MyRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
