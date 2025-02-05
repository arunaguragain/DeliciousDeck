import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const Dashboard = React.lazy(() => import("./public/Dashboard"));
  const Login = React.lazy(() => import("./public/Login"));
  const Signup = React.lazy(()=> import("./public/Signup"));
  const MainPage = React.lazy(() => import('./private/Main'));
  const AboutUs = React.lazy(() => import('./private/AboutUs'));
  const ProfilePage = React.lazy(() => import('./private/MyProfile'));
 
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
        </Routes>
      </Suspense>
    </Router>

  );
}

export default App;
