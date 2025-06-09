import axios from "axios";
import { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import ReturnButton from "../components/Buttons/ReturnButton";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);

  const createDeleteHandler = (_id: string) => () => {
    handleDeleteAccount(_id);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteAccount = async (_id: string) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this account?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/user/${_id}`);
      console.log("Usuário deletado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen p-4">
      <h1 className="text-white text-2xl font-bold mb-6">Users</h1>
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-full max-w-4xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Admin</th>
              <th className="px-6 py-3">
                {" "}
                <TiDelete />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 hover:bg-cyan-50"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button onClick={createDeleteHandler(user._id)}>
                    <TiDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" mt-15">
        <ReturnButton />
      </div>
    </div>
  );
};

export default Admin;
