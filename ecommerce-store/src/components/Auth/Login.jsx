import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/features/authSlice";
import axios from "../api/axios";
import CustomButton from "../UI/Button";
import CustomInput from "../UI/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // Step 1: Login to get access_token and refresh_token
      const loginResponse = await axios.post("/auth/login", { email, password });
      const { access_token } = loginResponse.data;

      // Step 2: Fetch user profile using the access_token
      const profileResponse = await axios.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Step 3: Dispatch login action with user data
      dispatch(login(profileResponse.data));

      // Save tokens to localStorage (optional)
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(profileResponse.data));
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <CustomInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton onClick={handleLogin}>Login</CustomButton>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;