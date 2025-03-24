import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useVerifyAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Sem token")
        navigate("/")
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
            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");
            setError("Session expired. Please log in again.");
            navigate("/");
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
  }, [navigate]);

  const refreshAuth = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://localhost:4000/verify-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAuthenticated(true);
      setUserInfo(response.data.user);
      setError("");
      return true;
    } catch (err) {
      setIsAuthenticated(false);
      setUserInfo(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    userInfo,
    isLoading,
    error,
    refreshAuth,
  };
};

export default useVerifyAuth;
