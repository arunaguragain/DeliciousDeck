import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const storedEmail = localStorage.getItem("storedEmail");
    const storedPassword = localStorage.getItem("storedPassword");

    if (data.email === storedEmail && data.password === storedPassword) {
      alert("Login successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-main">
      <div className="login-nav">
        <div className="login-logo"></div>
      </div>
      <div className="login-contents">
        <div className="login-picture"></div>
        <div className="login-container">
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Login to Delicious Deck</h1>

            <label>Email</label>
            <input {...register("email")} />
            <p className="error-text">{errors.email?.message}</p>

            <label>Password</label>
            <input type="password" {...register("password")} />
            <p className="error-text">{errors.password?.message}</p>

            <p>
              Forgot password?{" "}
              <button type="button" onClick={() => navigate("/resetPassword")}>
                Reset Password
              </button>
            </p>

            <button type="submit" className="btn-login">Login</button>

            <p>
              Don't have an account?{" "}
              <button type="button" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
