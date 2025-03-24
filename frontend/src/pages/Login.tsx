import Inputs from "../components/Inputs/Inputs";
import cadeado from "../assets/cadeado.png";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] h-auto md:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex-1 flex flex-col items-start justify-start gap-5 w-full p-4">
          <div className="text-cyan-900 font-bold text-3xl mb-4">
            <h1>Welcome!</h1>
          </div>
          <label className="block text-lg text-white">Email</label>
          <Inputs
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block text-lg text-white">Password</label>
          <Inputs
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <SubmitButton>
            Login
          </SubmitButton>

          <div className="w-full max-w-[450px] text-center">
            <span className="text-white text-lg">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-200 hover:text-cyan-400 underline"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center w-full p-4">
          <img
            src={cadeado}
            alt="Imagem de um cadeado"
            className="w-full h-auto max-w-[300px] md:max-w-[400px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
