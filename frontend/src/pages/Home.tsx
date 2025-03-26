import React from 'react';
import useVerifyAuth from "../hooks/verifyAuth";
import DeleteButton from "../components/Buttons/DeleteButton";
import SubmitButton from "../components/Buttons/SubmitButton";
import axios from "axios";



const Home: React.FC = () => {
  const { userInfo, token, logout } = useVerifyAuth();

  console.log(userInfo)

  const handleDeleteAccount = async () => {
    if (!userInfo || !token) {
      console.error("User is not authenticated or missing token");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4000/user/${userInfo.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      alert("Account deleted successfully");
      logout(); 
    } catch (err) {
      console.error("Error deleting account", err);
      alert("There was an error deleting your account.");
    }
  };

  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen flex items-center justify-center p-4">
      <SubmitButton>Edit Info</SubmitButton>
      <DeleteButton onClick={handleDeleteAccount}>Delete account</DeleteButton>
    </div>
  );
};

export default Home;
