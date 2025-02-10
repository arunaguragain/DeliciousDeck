import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../styles/MyProfile.css";

const schema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required"),
  DOB: Yup.date().required("Date of Birth is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  address: Yup.string().required("Address is required"),
  contact: Yup.string().required("Contact is required"),
});

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    reset();
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
    navigate("/login");
    setShowModal(false);
  };

  const handleLogoutCancel = () => {
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>✖</button>
        <button onClick={() => navigate('/orders')}>
          <img src="src/pictures/orders-icon.png" className="icon" alt="Orders" /> My Orders
        </button>
        <button onClick={() => navigate('/favorites')}>
          <img src="src/pictures/favorites-icon.png" className="icon" alt="Favorites" /> Favorites
        </button>
        <button onClick={() => navigate('/mytable')}>
          <img src="src/pictures/table-icon.png" className="icon" alt="Table" /> My Table
        </button>
        <button className="logout-btn" onClick={handleLogoutClick}>
          <img src="src/pictures/logout-icon.png" className="icon" alt="Logout" /> Logout
        </button>
      </div>

      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={toggleSidebar}></div>
        <div className="nav-links">
          <button onClick={() => navigate("/mainpage")}>Home</button>
          <button onClick={() => navigate("/aboutus")}>About Us</button>
          <button onClick={() => navigate("/contactus")}>Contact Us</button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile">
        <div className="profile-card">
          <div className="profile-info">
            <label htmlFor="profile-upload">
              <img
                src={profilePic || "default-profile.png"}
                alt="Profile"
                className="profile-img"
              />
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {editing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input {...register("fullname")} />
                </div>
                <p className="error">{errors.fullname?.message}</p>

                <div className="form-group">
                  <label>DOB</label>
                  <input type="date" {...register("DOB")} />
                </div>
                <p className="error">{errors.DOB?.message}</p>

                <div className="form-group">
                  <label>Email</label>
                  <input {...register("email")} />
                </div>
                <p className="error">{errors.email?.message}</p>

                <div className="form-group">
                  <label>Address</label>
                  <input {...register("address")} />
                </div>
                <p className="error">{errors.address?.message}</p>

                <div className="form-group">
                  <label>Contact</label>
                  <input {...register("contact")} />
                </div>
                <p className="error">{errors.contact?.message}</p>

                <div className="form-buttons">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="user-details">
                <h2>John Doe</h2>
                <p>johndoe@example.com</p>
                <p>123-456-7890</p>
                <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleLogoutConfirm} className="confirm-btn">Confirm</button>
            <button onClick={handleLogoutCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
