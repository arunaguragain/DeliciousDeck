import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../styles/Signup.css'

const schema = yup.object().shape({
    fullname: yup.string().required("Full Name is required"),
    DOB: yup.string().required("DOB is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    address: yup.string().required("Address is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 
    "Passwords must match").required("Confirm Password is required")
});

const SignupForm =() =>{
    const{
            register, 
            handleSubmit,
            formState :{errors},
        } = useForm({
            resolver: yupResolver(schema),
        });

        const onSubmit = async (data) => {
            try {
                // Prepare the data for registration
                const registrationData = {
                    fullName: data.fullname,
                    dob: data.DOB,
                    email: data.email,
                    address: data.address,
                    password: data.password,
                };
        
                // Make the POST request to the backend
                const response = await axios.post('http://localhost:5001/users/register', registrationData);
        
                // Handle success response (you can show a success message, for example)
                console.log('Registration Successful:', response.data);
                // Navigate to login or dashboard page after successful signup
                navigate('/login');
            } catch (error) {
                // Handle error response
                console.error('Error registering user:', error.response.data);
            }
        };
        

        const navigate = useNavigate();
           const handleLogin = () => {
        navigate('/login');
    };
    return(
    <div className="signup-main">
    <div className="signup-nav">
        <div className="signup-logo"></div>
    </div>
<div className="signup-contents">
    <div className="signup-picture"></div>
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register to Delicious Deck</h2>
        <label>Full Name</label>
        <input {...register("fullname")}/>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.fullname?.message}
            </p>
        <label>Date of birth</label>
        <input type="date" {...register("DOB")}/>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.DOB?.message}
             </p>
        <label>Email</label>
        <input {...register("email")}/>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.email?.message}
        </p>
        <label>Address</label>
        <input {...register("address")}/>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.address?.message}
        </p>
        <label for="password">Enter Password</label>
        <input type="password"{...register("password")}/>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.password?.message}
        </p>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")}/>
        <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.confirmPassword?.message}
        </p>
        <button type="submit" className="btn" id="btn">Sign Up</button>
        <p>already have an account?<button type="submit" onClick={handleLogin}>Login</button></p>
        </form>
    </div>
</div>
</div>
    );
};

export default SignupForm;


