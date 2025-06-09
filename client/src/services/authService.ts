import axios from "axios";

export const verifyAuthToken = async (token: string) => {
  const response = await axios.get("http://localhost:4000/verify-auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
