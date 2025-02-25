import React from "react";
import { FaHome, FaList, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// Main Admin Component
const AdminPage = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("user");

    // Alert user
    alert("Logging out...");

    // Redirect to login page
    navigate("/login");
    window.location.reload(); //
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ minHeight: "100vh", width: "250px" }}>
        <h4 className="mb-4">🍽️ Delicious Deck Admin</h4>
        <ul className="list-unstyled">
          <SidebarItem icon={<FaHome />} text="Dashboard" onClick={() => navigate("/adminpage")} />
          <SidebarItem icon={<FaList />} text="Menu Management" onClick={() => navigate("/menumanagement")} />
          <SidebarItem icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} />
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="container-fluid p-4" style={{ flex: 1 }}>
        <h2>📊 Admin Dashboard</h2>
        <p>Welcome to the admin panel. Use the sidebar to navigate.</p>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, onClick }) => (
  <li className="cursor-pointer py-2" onClick={onClick} style={{ cursor: "pointer" }}>
    {icon} <span className="ms-2">{text}</span>
  </li>
);

export default AdminPage;
