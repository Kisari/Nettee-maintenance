import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthHook";
import Swal from "sweetalert2";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user?.status !== "success") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You need to login first!",
    });
    return <Navigate to="/login" />;
  }
  return children;
};
