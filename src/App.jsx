import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const Dashboard = React.lazy(() => import("./public/Dashboard"));
  const Login = React.lazy(() => import("./public/Login"));
  const Signup = React.lazy(()=> import("./public/Signup"));
  const MainPage = React.lazy(() => import('./private/Main'));
  const AboutUs = React.lazy(() => import('./private/AboutUs'));
  const ProfilePage = React.lazy(() => import('./private/MyProfile'));
  const ReviewSection = React.lazy(() => import('./private/ReviewsAndRatings'));
  const ContactUs = React.lazy(() => import('./private/ContactUs.jsx'));
  const Menu = React.lazy(() => import('./private/Menu.jsx'));
  const BookingForm = React.lazy(() => import('./private/BookTable.jsx'))
 
  return (
    <Router>
      <Suspense fallback={<div>loading..</div>}>
        <Routes>
         <Route path="/" element={<Navigate to ="/Dashboard" />}></Route>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/signup" element={<Signup/>}></Route>
         <Route path='/mainpage' element={<MainPage/>}></Route>
         <Route path='/aboutus' element={<AboutUs/>}></Route>
         <Route path='/profilepage' element={<ProfilePage/>}></Route>
         <Route path='/reviewsection' element={<ReviewSection/>}></Route>
         <Route path='/contactus' element={<ContactUs/>}></Route>
         <Route path='/menu' element={<Menu/>}></Route>
         <Route path='/bookingform' element={<BookingForm/>}></Route>
        </Routes>
      </Suspense>
    </Router>

  );
}

export default App;
