import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Plus, Calendar, MapPin, Pencil, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null); // Tracks the event ID of the selected event to toggle the description
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/events", {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/events",
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setForm({ title: "", date: "", location: "", description: "" });
      setShowForm(false);
    } catch (err) {
      setError("Error adding event.");
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/events/${currentEvent._id}`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === currentEvent._id ? response.data : event
        )
      );
      setIsEditing(false);
      setCurrentEvent(null);
      setForm({ title: "", date: "", location: "", description: "" });
      setShowForm(false);
    } catch (err) {
      setError("Error updating event.");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (err) {
      setError("Error deleting event.");
    }
  };

  const toggleDescription = (eventId) => {
    if (selectedEventId === eventId) {
      setSelectedEventId(null); // Hide the description if the event is already selected
    } else {
      setSelectedEventId(eventId); // Show the description of the selected event
    }
  };

  const startEditing = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage and explore your events</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setIsEditing(false);
              setForm({ title: "", date: "", location: "", description: "" });
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {isEditing ? "Edit Event" : "Add New Event"}
            </h2>
            <form onSubmit={isEditing ? handleEditEvent : handleAddEvent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter event title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <input
                      name="location"
                      value={form.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter location"
                      required
                    />
                    <MapPin className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter event description"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isEditing ? "Save Changes" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Event List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                onClick={() => toggleDescription(event._id)} // Toggle description on click
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-500">{event.date}</p>
                <p className="text-sm text-gray-400">{event.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => startEditing(event)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                                 </div>
                {selectedEventId === event._id && (
                  <div className="mt-4 text-gray-800">{event.description}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
