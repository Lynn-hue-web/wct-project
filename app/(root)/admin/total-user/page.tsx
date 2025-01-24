'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

export default function TotalUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/total-user');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userList: User[] = await response.json();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Total Users</h2>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left border-b border-gray-200">ID</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Name</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Email</th>
              <th className="py-3 px-6 text-left border-b border-gray-200">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                  {/* Display sequential ID instead of Clerk's unique ID */}
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
