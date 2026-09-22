import React, { useState } from "react";
import { useAdminData } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import axios from "axios";
import { URL } from "../../apis/Backend_url";

const ManageUser = () => {
  const { users, setUsers } = useAdminData();

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const navigate = useNavigate();

 
  const handleUpdate = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };


  const handleDelete = async (id) => {
    console.log("Delete user:", id);

    try {
      const response = await axios.delete(
        `${URL}/api/admin/deleteUser/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.log("error in deleting user", error);
    }
  };

  // Update user role
  const handleRoleUpdate = async () => {
    console.log("Update user:", selectedUser.id);
    console.log("New role:", newRole);

    try {
      const response = await axios.put(
        `${URL}/api/admin/updateUser/${selectedUser.id}`,
        {
          role: newRole,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id
            ? { ...user, role: newRole }
            : user
        )
      );

      
      setSelectedUser(null);
    } catch (error) {
      console.log("error in updating user", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/DashBoard")}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          >
            <HiArrowLeft className="text-xl" />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Manage Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage registered users.
          </p>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-50">
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="px-6 py-4 font-semibold">
                    ID
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Name
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Role
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users?.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        #{user.id}
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">
                          {user.name}
                        </p>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-600"
                              : user.role === "agent"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() => handleUpdate(user)}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDelete(user.id)}
                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Update Role Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

              {/* Modal Header */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  Update User
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update the role of{" "}
                  <span className="font-medium text-gray-700">
                    {selectedUser.name}
                  </span>
                  .
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role
                </label>

                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="user">
                    User
                  </option>

                  <option value="agent">
                    Agent
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={() => setSelectedUser(null)}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleRoleUpdate}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageUser;


