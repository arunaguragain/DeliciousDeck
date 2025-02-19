import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "../styles/MyProfile.css";

// Yup schema for validation
const schema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  dob: Yup.date().required("Date of Birth is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  address: Yup.string().required("Address is required"),
});

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5001/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          setUserData(data);

          const formattedDob = data.dob ? data.dob.split("T")[0] : '';

          reset({
            fullName: data.fullName || '',
            dob: formattedDob, // Use the formatted date here
            email: data.email || '',
            address: data.address || '',
          });

          setProfilePic(data.profilePicture ? `http://localhost:5001/${data.profilePicture}` : null);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setLoading(false);
        });
    }
  }, [token, reset]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Store the image as a base64 string temporarily
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log("Submitting data:", data);
    setEditing(false);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("dob", data.dob);
    formData.append("email", data.email);
    formData.append("address", data.address);
    
    // Include the profilePic if it exists as a file object
    const profilePicFile = document.querySelector("#profile-upload").files[0];
    if (profilePicFile) {
      formData.append("profilePic", profilePicFile);
    }

    axios
      .put("http://localhost:5001/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Updated profile data:", response.data);
        // Ensure the profile data is updated in both state and form
        const updatedUser = response.data.user;
        setUserData(updatedUser);  // Update userData state
        setProfilePic(updatedUser.profilePicture ? `http://localhost:5001/${updatedUser.profilePicture}` : null);
        
        // Manually reset the form with the updated data
        reset({
          fullName: updatedUser.fullName,
          dob: updatedUser.dob ? updatedUser.dob.split("T")[0] : "",
          email: updatedUser.email,
          address: updatedUser.address,
        });
        
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleCancel = () => {
    setEditing(false);
    reset(userData); // Revert to original data if canceled
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setShowModal(false);
  };

  const handleLogoutCancel = () => {
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>✖</button>
        <button onClick={() => navigate('/myorders')}>
          <img src="src/pictures/orders-icon.png" className="icon" alt="Orders" /> My Orders
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
                  <input type="text" {...register("fullName")} />
                </div>
                <p className="error">{errors.fullName?.message}</p>

                <div className="form-group">
                  <label>DOB</label>
                  <input type="date" {...register("dob")} />
                </div>
                <p className="error">{errors.dob?.message}</p>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" {...register("email")} />
                </div>
                <p className="error">{errors.email?.message}</p>

                <div className="form-group">
                  <label>Address</label>
                  <input type="text" {...register("address")} />
                </div>
                <p className="error">{errors.address?.message}</p>

                <div className="form-buttons">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="user-details">
                <h2>{userData.fullName}</h2>
                <p>{userData.email}</p>
                <p>{userData.address}</p>
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
            <h5>Are you sure you want to log out?</h5>
            <button onClick={handleLogoutConfirm} className="confirm-btn">Confirm</button>
            <button onClick={handleLogoutCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
