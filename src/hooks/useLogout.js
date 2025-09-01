import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();  // coming from your AuthContext
  const navigate = useNavigate();

  const logoutUser = () => {
    // clear auth state
    setAuth({});
    // clear localStorage
    localStorage.removeItem("auth");
    // navigate to login page
    navigate("/login", { replace: true });
    // show alert
    Swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return logoutUser;
};

export default useLogout;
