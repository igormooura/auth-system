import { useEffect, useState } from "react";
import Inputs from "../components/Inputs/Inputs";
import axios from "axios";
import useVerifyAuth from "../hooks/verifyAuth";

const Edit = () => {
  const { userInfo } = useVerifyAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const userId = userInfo ? userInfo.userId : null;

  useEffect(() => {
    if (!userId) return;
  
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${userId}`);
        const userData = response.data;
  
        setEmail(userData.email);
        setName(userData.name);
      } catch (error) {
        console.error("Error loading profile data", error);
      }
    };
  
    fetchUserData();
  }, [userId]);
  

  

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen p-4">
      <h1 className="text-white text-2xl font-semibold">Edit Profile</h1>

      <div className="w-full max-w-[1000px] h-auto md:h-[600px] sm:h-[600px] rounded-lg p-4 bg-white bg-opacity-60 flex flex-col md:flex-row items-center justify-center gap-4">
        <form  className="w-full max-w-[450px] flex-col">
          <label className="block text-lg text-white text-left">Email</label>
          <Inputs
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-lg text-white text-left">Name</label>
          <Inputs
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
