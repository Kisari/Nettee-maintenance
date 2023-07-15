import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthHook";
import Swal from "sweetalert2";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // if (!JSON.parse(localStorage.getItem("NETTEE_TOKEN"))?.status) {
  //     localStorage.removeItem("NETTEE_TOKEN");
  //     Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'You need to login first!',
  //     })
  //     return <Navigate to="/login" />;
  // }
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
