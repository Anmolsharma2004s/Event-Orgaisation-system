import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;


  if (isAuthenticated === false && user === null) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !user) {
    return <div>Loading user data...</div>;
  }





  if (currentPath.startsWith("/admin")) {
    if (user.role !== "admin") {
      return <Navigate to="/user/dashboard" replace />;
    }
    return children;
  }

  if (currentPath.startsWith("/user")) {
    if (user.role !== "user") {
      return <Navigate to="/admin/admindashboard" replace />;
    }
    return children;
  }


  return children;
};

export default CheckAuth;
