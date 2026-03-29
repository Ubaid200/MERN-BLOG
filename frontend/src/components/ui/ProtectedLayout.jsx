import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;