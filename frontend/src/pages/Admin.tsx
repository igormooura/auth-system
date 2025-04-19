import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-tl from-cyan-900 to-cyan-500 min-h-screen p-4">
      <h1 className="text-white text-2xl font-bold mb-6">Usuários</h1>
      <div className="bg-white rounded-lg overflow-hidden shadow-md w-full max-w-4xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-cyan-800 text-white">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Admin</th>
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
                    <span className="text-green-600 font-semibold">Sim</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Não</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
