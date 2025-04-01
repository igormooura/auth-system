import { useState } from "react";
import Inputs from "../components/Inputs/Inputs";

const Edit = () => {
  
    const handleEdit = async () =>{
        console.log("laalla")
    }
  
    const[email, setEmail] = useState("")

    return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen  p-4">
      <h1 className="text-white text-2xl font-semibold"> Edit Profile</h1>

      <div className="w-full max-w-[1000px] h-auto md:h-[600px] sm:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <form onClick={handleEdit} className="">
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
        </form>
      </div>
    </div>
  );
};

export default Edit;
