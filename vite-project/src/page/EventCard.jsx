import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

export default function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setEvents(response.data);
      } catch (err) {
        setError("Error fetching events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const fetchEventDescription = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedEvent(response.data);
    } catch (err) {
      setError("Error fetching event details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Event Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Explore events and view details on demand.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Events Section */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200"
                onClick={() => fetchEventDescription(event._id)}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-2">{event.location}</p>
              </div>
            ))}
          </div>
        )}

        {/* Selected Event Description */}
        {selectedEvent && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedEvent.title}
            </h2>
            <p className="text-gray-600 mt-4">
              {selectedEvent.description || "No description available."}
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
