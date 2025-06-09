import axios from "axios";

export const verifyAuthToken = async (token: string) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND}/verify-auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
