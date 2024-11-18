import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="border border-gray-300 p-2 mb-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-2 mb-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-full"
      >
        <option value="Admin">Admin</option>
        <option value="Organizer">Organizer</option>
        <option value="Viewer">Viewer</option>
      </select>
      <button className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
    </form>
  );
}
