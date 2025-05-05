import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Inputs from "../components/Inputs/Inputs";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("Invalid or expired token.");
      return;
    }

    if (!password) {
      setError("Please enter a new password");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/reset-password`,
        {
          token,
          password,
        }
      );

      if (response.status === 200) {
        
          alert("Password successfully reseted.")
          navigate("/");
  
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to reset password. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] h-auto md:h-[600px] sm:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col items-center justify-center gap-4">
        <div className="text-cyan-900 font-bold text-3xl mb-4 w-full max-w-[450px] text-left">
          <h1>Reset Password</h1>
        </div>

        <form onSubmit={handleReset} className="w-full max-w-[450px] flex-col">
          <label className="block text-lg text-white text-left">
            New Password
          </label>
          <Inputs
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
