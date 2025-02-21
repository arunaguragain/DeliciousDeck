import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './private/ProtectedRoute'; // Import ProtectedRoute

// Lazy load components
const Dashboard = React.lazy(() => import("./public/Dashboard"));
const Login = React.lazy(() => import("./public/Login"));
const Signup = React.lazy(() => import("./public/Signup"));
const MainPage = React.lazy(() => import('./private/Main'));
const AboutUs = React.lazy(() => import('./private/AboutUs'));
const ProfilePage = React.lazy(() => import('./private/MyProfile'));
const ReviewSection = React.lazy(() => import('./private/ReviewsAndRatings'));
const ContactUs = React.lazy(() => import('./private/ContactUs'));
const Menu = React.lazy(() => import('./private/Menu'));
const BookingForm = React.lazy(() => import('./private/BookTable'));
const MyTable = React.lazy(() => import('./private/MyTable'));
const MyCart = React.lazy(() => import('./private/MyCart'));
const MyOrders = React.lazy(() => import('./private/MyOrder'));
const OrderDetailsModal = React.lazy(() => import('./private/OrderDetailsModel'));
const AdminPage = React.lazy(() => import('./private/AdminPage'));
const MenuManagement = React.lazy(() => import("./private/MenuManagement"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/mainpage"
            element={<ProtectedRoute element={<MainPage />} />}
          />
          <Route
            path="/aboutus"
            element={<ProtectedRoute element={<AboutUs />} />}
          />
          <Route
            path="/profilepage"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/reviewsection"
            element={<ProtectedRoute element={<ReviewSection />} />}
          />
          <Route
            path="/contactus"
            element={<ProtectedRoute element={<ContactUs />} />}
          />
          <Route
            path="/menu"
            element={<ProtectedRoute element={<Menu />} />}
          />
          <Route
            path="/bookingform"
            element={<ProtectedRoute element={<BookingForm />} />}
          />
          <Route
            path="/mytable"
            element={<ProtectedRoute element={<MyTable />} />}
          />
          <Route
            path="/mycart"
            element={<ProtectedRoute element={<MyCart />} />}
          />
          <Route
            path="/myorders"
            element={<ProtectedRoute element={<MyOrders />} />}
          />
          <Route
            path="/orderdetailsmodel"
            element={<ProtectedRoute element={<OrderDetailsModal />} />}
          />

          {/* Admin Routes */}
          <Route
            path="/adminpage"
            element={<ProtectedRoute adminOnly={true} element={<AdminPage />} />}
          />
          <Route
            path="/menumanagement"
            element={<ProtectedRoute adminOnly={true} element={<MenuManagement />} />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
