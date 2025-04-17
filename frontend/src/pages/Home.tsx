import React from "react";
import useVerifyAuth from "../hooks/verifyAuth";
import DeleteButton from "../components/Buttons/DeleteButton";
import SubmitButton from "../components/Buttons/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeaveButton from "../components/Buttons/LeaveButton";

const Home: React.FC = () => {
  const { userInfo, token, logout } = useVerifyAuth();

  const navigate = useNavigate();

  console.log(userInfo);

  const handleEditUser = () => {
    navigate("/edit");
  };

  const handleLeave = () =>{
    logout()
  }

  const handleDeleteAccount = async () => {
    if (!userInfo || !token) {
      console.error("User is not authenticated or missing token");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:4000/user/${userInfo.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Account deleted successfully");
      logout();
    } catch (err) {
      console.error("Error deleting account", err);
      alert("There was an error deleting your account.");
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen w-full flex flex-col justify-between items-center p-52">
      
      <div className="flex flex-col items-center gap-6 mt-20">
        <div className="w-48">
          <SubmitButton onClick={handleEditUser}>Edit Info</SubmitButton>
        </div>
  
        <div className="flex flex-row gap-10">
          <div className="w-40">
            <DeleteButton onClick={handleDeleteAccount}>Delete account</DeleteButton>
          </div>
          <div className="w-40">
            <LeaveButton onClick={handleLeave}>Leave</LeaveButton>
          </div>
        </div>
      </div>
  
      
      <div className="w-full flex justify-center items-center h-24">
        {userInfo?.isAdmin && (
          <div className="text-white font-bold text-xl text-center">
            Admin resource: see all users
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Home;
