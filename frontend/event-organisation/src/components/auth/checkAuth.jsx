import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  if (location.pathname.startsWith("/admin") && user.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (location.pathname.startsWith("/user") && user.role !== "user") {
    return <Navigate to="/admin/admindashboard" replace />;
  }

  return children;
};

export default CheckAuth;