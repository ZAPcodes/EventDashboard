import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Viewer", 
  });
const [error, setError] = useState("");
const adminCredentials = {
    username: "admin",
    password: "password",
  };
 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
    e.preventDefault();

     try {
    //       if (formData.role === "admin") {
    //     if (
    //       formData.username !== adminCredentials.username ||
    //       formData.password !== adminCredentials.password
    //     ) {
    //       setError("Invalid admin credentials!");
    //       return;
    //     }
    //   }
 const response = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
      localStorage.setItem("token", response.data.token);
      if (formData.role === "Admin") navigate("/Admin-dashboard");
      else if (formData.role === "Organizer") navigate("/Organizer-dashboard");
      else navigate("/Viewer-dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

         
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="Viewer">Viewer</option>
              <option value="Organizer">Organizer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

     
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
          
        <p className="text-center mt-4">
          Dont Have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
