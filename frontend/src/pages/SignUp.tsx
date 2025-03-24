import { useState } from "react";
import Inputs from "../components/Inputs/Inputs";
import seguranca from "../assets/seguranca.png";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../components/Buttons/SubmitButton";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name) {
      return setError("Please enter your name");
    }

    if (!email) {
      return setError("Please enter a valid email");
    }

    if (!password) {
      return setError("Please enter a password");
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/register", {
        name,
        email,
        password
      });

      console.log("Registration successful", response.data);
      navigate("/", { state: { registrationSuccess: true } });
      
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] h-auto md:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex-1 flex items-center justify-center w-full p-4">
          <img
            src={seguranca}
            alt="Security illustration"
            className="w-full h-auto max-w-[300px] md:max-w-[400px] rounded-lg"
          />
        </div>

        <form onSubmit={handleRegister} className="flex-1 flex flex-col items-start gap-5 w-full p-4">
          <div className="text-cyan-900 font-bold text-3xl mb-4">
            <h1>Register your account</h1>
          </div>

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
          </div>

          <SubmitButton type="submit">
            {loading ? "Registering..." : "Register"}
          </SubmitButton>

          <div className="w-full max-w-[450px] text-center">
            <span className="text-white text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-200 hover:text-cyan-400 underline"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;