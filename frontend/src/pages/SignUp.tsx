import { useState } from "react";
import Inputs from "../components/Inputs/Inputs";
import seguranca from "../assets/seguranca.png";
import { Link } from "react-router-dom";
import SubmitButton from "../components/Buttons/SubmitButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] h-auto md:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex-1 flex items-center justify-center w-full p-4">
          <img
            src={seguranca}
            alt="seguranca"
            className="w-full h-auto max-w-[300px] md:max-w-[400px] rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col items-start gap-5 w-full p-4">
          <div className="text-cyan-900 font-bold text-3xl mb-4">
            <h1>Register your account</h1>
          </div>

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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <SubmitButton>Register</SubmitButton>

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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
