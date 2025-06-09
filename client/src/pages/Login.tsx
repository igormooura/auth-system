import Inputs from "../components/Inputs/Inputs";
import cadeado from "../assets/cadeado.png";
import { useState } from "react";
import SubmitButton from "../components/Buttons/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/home");
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          setError("Invalid email or password.");
        } else if (status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(err.response?.data?.message || "Login failed. Please try again.");
        }
      } else {
        setError("Unexpected error. Please check your network connection.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[1000px] h-auto md:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <form
          onSubmit={handleLogin}
          className="flex-1 flex flex-col items-start justify-start gap-5 w-full p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-cyan-900 font-bold text-3xl mb-4"
          >
            <h1>Welcome!</h1>
          </motion.div>

          {error && (
            <div className="w-full p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <label className="block text-lg text-white">Email</label>
          <Inputs
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-sm text-red-600">{emailError}</p>}

          <label className="block text-lg text-white">Password</label>
          <Inputs
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}

          <SubmitButton type="submit">
            {loading ? "Logging in..." : "Login"}
          </SubmitButton>

          <div className="w-full max-w-[450px] text-center">
            <span className="text-white text-lg">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-700 hover:text-cyan-400 underline"
              >
                Sign Up
              </Link>
            </span>

            <p className="text-white">
              <Link
                to="/forgotpassword"
                className="text-blue-700 hover:text-cyan-400 underline"
              >
                Reset your password
              </Link>
            </p>
          </div>
        </form>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 flex items-center justify-center w-full p-4"
        >
          <img
            src={cadeado}
            alt="Imagem de um cadeado"
            className="w-full h-auto max-w-[300px] md:max-w-[400px] rounded-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
