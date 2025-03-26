import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useVerifyAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, SetToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const verifyAuth = async () => {
     
      if (!token) {
        navigate("/")
        alert("Sem token")
        return;
      }
      console.log(token);
      try {
        const response = await axios.get("http://localhost:4000/verify-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(true);
        setUserInfo(response.data.user);
        setError("");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            SetToken("");
            navigate("/");
            return;
          } else {
            setError("Error verifying authentication");
          }
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
    SetToken("");
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/");
  };

  return {
    isAuthenticated,
    userInfo,
    isLoading,
    error,
    logout
  };
};

export default useVerifyAuth;
