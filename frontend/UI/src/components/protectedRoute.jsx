import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("token");

  //if no token, redirect to login
   if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(atob(token.split(".")[1]));

  // If admin required, check admin status
  if (requireAdmin) {
    if (!user?.is_admin) {
      alert("Must be admin to access this page");
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
