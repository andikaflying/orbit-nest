import React from "react";
import { Navigate } from "react-router-dom";

const Index: React.FC = () => {
  // Redirect to projects dashboard as the main page
  return <Navigate to="/projects" replace />;
};

export default Index;
