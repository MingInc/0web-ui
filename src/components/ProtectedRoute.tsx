import { auth } from "@/firebase.config";
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (!user) navigate("/login");
    });
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
