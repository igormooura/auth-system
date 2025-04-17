import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface UserInfo {
  userId: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const useVerifyAuth = () => {
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [token, SetToken] = useState<string>(localStorage.getItem("token") || "");

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        navigate("/");
        alert("No token found.");
        return;
      }

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
          const axiosError = err as AxiosError;
          if (axiosError.response?.status === 401) {
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
    token,
    error,
    logout
  };
};

export default useVerifyAuth;
