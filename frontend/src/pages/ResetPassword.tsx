import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Inputs from "../components/Inputs/Inputs";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or expired token.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/reset-password", {
        token,
        password,
      });

      setMessage(response.data.message);
      setPassword(""); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Failed to reset password. Please try again.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] h-auto md:h-[600px] sm:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <form onSubmit={handleReset} className="w-full max-w-[450px] flex-col">
          <label className="block text-lg text-white text-left">New Password</label>
          <Inputs
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
          >
            Reset Password
          </button>

          {message && (
            <p className="mt-4 text-white text-center bg-green-600 rounded py-2 px-2">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-4 text-white text-center bg-red-600 rounded py-2 px-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
