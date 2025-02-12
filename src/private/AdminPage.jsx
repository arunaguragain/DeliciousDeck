import React, { useState, useEffect } from "react";
import { FaHome, FaList, FaShoppingCart, FaUsers, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// Main Admin Component
const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Logout function (Example)
  const handleLogout = () => {
    alert("Logging out...");
    // Implement real logout logic here (clear token, redirect, etc.)
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ minHeight: "100vh", width: "250px" }}>
        <h4 className="mb-4">🍽️ Delicious Deck Admin</h4>
        <ul className="list-unstyled">
          <SidebarItem icon={<FaHome />} text="Dashboard" onClick={() => setActiveSection("dashboard")} />
          <SidebarItem icon={<FaList />} text="Menu Management" onClick={() => setActiveSection("menuManagement")} />
          <SidebarItem icon={<FaShoppingCart />} text="Orders" onClick={() => setActiveSection("orderManagement")} />
          <SidebarItem icon={<FaUsers />} text="Users" onClick={() => setActiveSection("userManagement")} />
          <SidebarItem icon={<FaChartBar />} text="Analytics" onClick={() => setActiveSection("analytics")} />
          <SidebarItem icon={<FaCog />} text="Settings" onClick={() => setActiveSection("settings")} />
          <SidebarItem icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} />
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="container-fluid p-4" style={{ flex: 1 }}>
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "menuManagement" && <MenuManagement />}
        {activeSection === "orderManagement" && <OrderManagement />}
        {activeSection === "userManagement" && <UserManagement />}
        {activeSection === "analytics" && <Analytics />}
        {activeSection === "settings" && <Settings />}
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

// 🔹 Section Components
const Dashboard = () => <h2>📊 Dashboard</h2>;
const MenuManagement = () => <h2>📋 Manage Menu</h2>;
const OrderManagement = () => <h2>🛒 Manage Orders</h2>;
const UserManagement = () => <h2>👥 Manage Users</h2>;
const Analytics = () => <h2>📈 Sales & Reports</h2>;
const Settings = () => <h2>⚙️ Settings</h2>;

export default AdminPage;
