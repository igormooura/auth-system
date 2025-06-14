import { useState } from "react";
import Inputs from "../components/Inputs/Inputs";
import seguranca from "../assets/seguranca.png";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/Buttons/SubmitButton";
import axios from "axios";
import { motion } from "framer-motion";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setError("");

    if (!name.trim()) {
      setNameError("Name is required.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 1) {
      setPasswordError("Password must be at least 1 character");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/register`, {
        name,
        email,
        password,
      });

      console.log("Registration successful", response.data);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 409) {
          setError("Email is already registered.");
        } else if (status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(err.response?.data?.message || "Registration failed.");
        }
      } else {
        setError("Unexpected error. Please check your connection.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[1000px] h-auto md:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 flex items-center justify-center w-full p-4"
        >
          <img
            src={seguranca}
            alt="Security illustration"
            className="w-full h-auto max-w-[300px] md:max-w-[400px] rounded-lg"
          />
        </motion.div>

        <form
          onSubmit={handleRegister}
          className="flex-1 flex flex-col items-start gap-5 w-full p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-cyan-900 font-bold text-3xl mb-4"
          >
            <h1>Register your account</h1>
          </motion.div>

          {error && (
            <div className="w-full p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="w-full max-w-[450px]">
            <label className="block text-lg text-white text-left">Name</label>
            <Inputs
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <p className="text-sm text-red-600">{nameError}</p>}
          </div>

          <div className="w-full max-w-[450px]">
            <label className="block text-lg text-white text-left">Email</label>
            <Inputs
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-sm text-red-600">{emailError}</p>}
          </div>

          <div className="w-full max-w-[450px]">
            <label className="block text-lg text-white text-left">
              Password
            </label>
            <Inputs
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          </div>

          <SubmitButton type="submit">
            {loading ? "Registering..." : "Register"}
          </SubmitButton>

          <div className="w-full max-w-[450px] text-center">
            <span className="text-white text-lg">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-cyan-200 hover:text-cyan-400 underline"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
