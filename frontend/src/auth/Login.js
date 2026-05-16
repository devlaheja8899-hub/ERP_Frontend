import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/token/",
        {
          username,
          password,
        }
      );
      console.log("Login successful:", response.data);
      console.log("Received tokens:", response.data.data.access, response.data.refresh);
      localStorage.setItem("access_token", response.data.data.access);
      localStorage.setItem("refresh_token", response.data.data.refresh);

      console.log("ACCESS TOKEN:", response.data.access);

      navigate("/dashboard"); // ✅ MUST MATCH App.js
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;