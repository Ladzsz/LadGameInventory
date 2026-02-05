import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token.split(".")[1]));

  // Check if logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

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
