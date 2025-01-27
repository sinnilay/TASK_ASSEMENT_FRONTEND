import { useEffect, useState } from "react";
import { getAllUsers } from "../SERVICES/Api.js";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching users.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">view all user data</p>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Users Data</h2>
      <div className="space-y-6">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="p-6 bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  <div className="grid grid-cols-2 gap-4">
                    {user.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="User"
                        className="w-24 h-24 rounded-lg object-cover border border-gray-300 shadow-sm hover:scale-105 transform transition duration-200 ease-in-out"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>Social Handle:</strong> {user.socialHandle}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
