import { useState } from "react";
import Inputs from "../components/Inputs/Inputs";
import SubmitButton from "../components/Buttons/SubmitButton";
import axios from "axios";
import ReturnButton from "../components/Buttons/ReturnButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const passwordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try  {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/forgotpassword`,{
        email: email
      })

      if (response.status === 200){
        alert("Email has been sent");
  
      }
      if(response.status === 404){
        alert("Email not found in our database");
      }

    } catch(error){
        console.log(error)
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-[900px] h-auto md:h-[600px] sm:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col items-center justify-center gap-4">
    
      <div className="absolute top-4 left-4">
          <ReturnButton />
        </div>

        <div className="text-cyan-900 font-bold text-3xl mb-4 w-full text-center">
          <h1>Reset your password</h1>
        </div>
        
        <form
          onSubmit={passwordReset}
          className="w-full max-w-[450px] flex-col"
        >
          <label className="block text-lg text-white text-left">Email</label>
          <Inputs
            type="email"
            placeholder="Put yout registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mt-5"> 
            <SubmitButton type="submit">
              {"Receive the reset link"}
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;  