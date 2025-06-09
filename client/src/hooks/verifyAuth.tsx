import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { verifyAuthToken } from "../services/authService";

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
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const data = await verifyAuthToken(token);
        setIsAuthenticated(true);
        setUserInfo(data.user);
        setError("");
      } catch (err) {
        if ((err as AxiosError).response?.status === 401) {
          setToken("");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setError("Erro ao verificar autenticação");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
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
