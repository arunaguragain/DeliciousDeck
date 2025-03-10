import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../environment";

import "../styles/Login.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Logging in with:", data);
    console.log("API Base URL:", API.BASE_URL);

    axios
      .post(`${API.BASE_URL}/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      })
      .then((response) => {
        console.log("Login Response:", response.data);

        if (response.data && response.data.token) {
          console.log("Access Token:", response.data.token);

          // Store user details and token
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("userDetails", JSON.stringify(response.data.userDetails));
          localStorage.setItem("user", JSON.stringify({
            token: response.data.token,
            userId: response.data.userId,
            role: response.data.role,
            userDetails: response.data.userDetails,
          }));

          // Store role from the response directly (no need to decode the JWT)
          const role = response.data.role;

          if (role === "admin") {
            navigate("/adminpage"); // Navigate to admin dashboard
          } else {
            navigate("/mainpage"); // Regular user dashboard
          }

          window.location.reload(); // Optional to reload the page for any fresh state
        } else {
          alert("Login failed! Check credentials");
        }
      })
      .catch((error) => {
        if (error.response) {
          const { message } = error.response.data;
          if (message.includes("email is required")) {
            setError("email", {
              type: "manual",
              message: message,
            });
          } else if (message.includes("password is required")) {
            setError("password", {
              type: "manual",
              message: message,
            });
          } else if (message.includes("incorrect password")) {
            setError("password", {
              type: "manual",
              message: message,
            });
          } else if (message.includes("user not found")) {
            setError("email", {
              type: "manual",
              message: message,
            });
          }
        } else {
          console.error("Error logging in:", error);
          alert("Error logging in. Please try again");
        }
      });

    reset();
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

            <button type="submit" className="btn-login">Login</button>

            <p>
              Don't have an account?{" "}
              <button type="button" className="btnsign" onClick={() => navigate("/signup")}>
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
