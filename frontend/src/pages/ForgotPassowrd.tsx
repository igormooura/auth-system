import { useState } from "react";
import Inputs from "../components/Inputs/Inputs"

const ForgotPassowrd = () => {

    const[email, setEmail] = useState("");

    const passwordReset = async (e: React.FormEvent) => {
        e.preventDefault();
    }
    
  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[900px] h-auto md:h-[600px] sm:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <form onSubmit={passwordReset} className="w-full max-w-[450px] flex-col">

        
        <label className="block text-lg text-white text-left">Email</label>
        <Inputs
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </form>
        </div>
    </div>
  )
}

export default ForgotPassowrd
