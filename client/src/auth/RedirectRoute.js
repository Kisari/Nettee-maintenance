import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthHook";

export const RedirectRoute = ({ children }) => {
  const { user } = useAuth();

  if (user || user?.status === "success") {
    return <Navigate to="/home" replace={true} />;
  }

  return children;
};
