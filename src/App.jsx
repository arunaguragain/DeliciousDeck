import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const Login = React.lazy(() => import("./public/Login"));
  const Signup = React.lazy(()=> import("./public/Signup"));
 
  return (
    <Router>
      <Suspense fallback={<div>loading..</div>}>
        <Routes>
         <Route path="/" element={<Navigate to ="/Login" />}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </Suspense>
    </Router>

  );
}

export default App;
