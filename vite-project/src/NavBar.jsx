import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl">Event Management</h1>
        <div>
          <Link to="/login/admin" className="text-white mx-2">Admin Login</Link>
          <Link to="/login/organizer" className="text-white mx-2">Organizer Login</Link>
          <Link to="/login/viewer" className="text-white mx-2">Viewer Login</Link>
        </div>
      </div>
    </nav>
  );
}
