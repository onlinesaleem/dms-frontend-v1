// src/pages/LogoutPage.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out.</h2>
    </div>
  );
};

export default LogoutPage;
