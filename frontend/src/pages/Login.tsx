import Inputs from "../components/Inputs";
import cadeado from "../assets/cadeado.png";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton/SubmitButton";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center">
      <div className="w-[1000px] h-[600px] rounded-lg p-2 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="text-cyan-900 font-bold text-3xl mb-4 md:mb-0 md:mr-8">
            <h1>Welcome!</h1>
          </div>
          <Inputs
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Inputs
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <SubmitButton/>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            src={cadeado}
            alt="Imagem de um cadeado"
            className="w-full h-auto max-w-[400px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
