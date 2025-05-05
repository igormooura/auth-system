import React from "react";
import useVerifyAuth from "../hooks/verifyAuth";
import DeleteButton from "../components/Buttons/DeleteButton";
import SubmitButton from "../components/Buttons/SubmitButton";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LeaveButton from "../components/Buttons/LeaveButton";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const { userInfo, token, logout } = useVerifyAuth();

  const navigate = useNavigate();

  console.log(userInfo);

  const handleEditUser = () => {
    navigate("/edit");
  };

  const handleLeave = () => {
    logout();
  };

  const handleDeleteAccount = async () => {
    if (!userInfo || !token) {
      console.error("User is not authenticated or missing token");
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/user/${userInfo.userId}`,
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
      <motion.div
        className="flex flex-col items-center gap-6 mt-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.div
          className="w-48"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SubmitButton onClick={handleEditUser}>Edit Info</SubmitButton>
        </motion.div>

        <motion.div
          className="flex flex-row gap-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <motion.div
            className="w-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DeleteButton onClick={handleDeleteAccount}>
              Delete account
            </DeleteButton>
          </motion.div>
          <motion.div
            className="w-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LeaveButton onClick={handleLeave}>Leave</LeaveButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full flex justify-center items-center h-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {userInfo?.isAdmin && (
          <div className="text-white font-bold text-xl text-center">
            Admin resource:
            <p>
              <Link to="/admin" className="underline text-blue-300">
                See all users
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
