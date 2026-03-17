import { useEffect, useState } from "react";
import api from "../../api";
import { Users, Search, Eye, X } from "lucide-react";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <Users /> User Management
      </h1>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 p-3 w-full border rounded-lg"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Orders</th>
              <th className="p-4 text-left">Total Spent</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4">₹{user.totalSpent}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px] relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-3 top-3"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><b>Name:</b> {selectedUser.username}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role}</p>
            <p><b>Orders:</b> {selectedUser.orders}</p>
            <p><b>Total Spent:</b> ₹{selectedUser.totalSpent}</p>
            <p><b>Joined:</b> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserData;