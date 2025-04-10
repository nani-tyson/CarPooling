import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const DriverRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/rides/driver/requests');
        setRequests(res.data.requests);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleDecision = async (requestId, decision) => {
    try {
      await api.patch(`/requests/${requestId}`, { status: decision });
      setRequests(requests.map(req => 
        req._id === requestId ? {...req, status: decision} : req
      ));
    } catch (err) {
      console.error('Failed to update request:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ride Requests</h2>
      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <div className="space-y-4">
      {requests.map(request => (
        <div key={request._id} className="border p-4 rounded mb-4">
          <h3 className="font-bold">Request from {request.rider?.name}</h3>
          <p>Ride: {request.ride?.pickupLocation} to {request.ride?.dropLocation}</p>
          <p>Status: {request.status}</p>
          
          {request.status === 'pending' && (
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => handleDecision(request._id, 'approved')}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button 
                onClick={() => handleDecision(request._id, 'rejected')}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          )}
        </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverRequests;
