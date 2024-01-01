import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider";

const Login = () => {
  const { authToken, login, logout } = useAuth();
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const [logInStatus, setLogInStatus] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(localStorage.getItem('userId'))
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(logInData);
    try {
      const response = await axios.post("/api/auth/login", logInData, {
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
      });

      const data = response.data; // Use response.data directly
      const token = response.data.token;

      // Store the token using the context
      login(token);
      console.log(response);
      console.log(data.user._id);
      localStorage.setItem('userId', data.user._id);

      if (response.ok) {
        setLogInStatus(true);
      }
    } catch (error) {
      console.error("Error during Login:", error.response);
      // Handle error (display error message, etc.)
    }
  };
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:{" "}
          <input name="email" type="email" onChange={handleChange} required />
        </label>
        <label>
          password:{" "}
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </label>
      </form>

      <h2>{logInStatus}</h2>
    </div>
  );
};

export default Login;
