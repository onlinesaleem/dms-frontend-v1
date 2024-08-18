// src/auth/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      // Replace with your backend API endpoint
      const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
        username,
        password,
      });

      

      // Assuming the response contains a JWT token and user information
      const token = response.data.jwt; // Adjust according to your backend response
      const usernameFromBackend = response.data.username; // Adjust according to your backend response
      console.log("the token is"+token);
      console.log("Response from backend:", response.data);
      // Save the token to localStorage (or cookies)
      localStorage.setItem("authToken", token);

      // Set the user in state
      setUser(usernameFromBackend);

      // Navigate to the desired page
      navigate("/documents");
    } catch (error) {
      // Handle errors, e.g., show a notification or message
      console.error("Login failed", error);
      throw new Error("Invalid username or password");
    }
  };

  const logout = () => {
    // Remove the token from localStorage (or cookies)
    localStorage.removeItem("authToken");

    // Clear the user state
    setUser(null);

    // Navigate to login page
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
