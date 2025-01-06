import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password || !avatar) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("/users/", {
        name,
        email,
        password,
        avatar,
      });
      console.log("SignUp successful:", response.data);

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("SignUp failed:", error);
      setError("Email already exists or an error occurred.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <CustomInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4"
        />
        <CustomInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4"
        />
        <CustomInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4"
        />
        <CustomInput
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full mb-6"
        />
        <CustomButton onClick={handleSignUp} className="w-full">
          Sign Up
        </CustomButton>
      </div>
    </div>
  );
}

export default SignUp;