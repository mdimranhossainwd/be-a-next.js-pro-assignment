"use client";

import { useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  status: "ACTIVE" | "BANNED" | "SUSPENDED";
};

export default function UserTable({ users }) {
  const [userList, setUserList] = useState<User[]>(users?.data || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updateStatus = async (userId: string, status: User["status"]) => {
    try {
      setLoadingId(userId);

      const res = await fetch(`http://localhost:3000/api/v1/status/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setUserList((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, status } : user)),
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Name</th>
            <th className="border px-3 py-2 text-left">Email</th>
            <th className="border px-3 py-2">Verified</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td className="border px-3 py-2">{user.name}</td>
              <td className="border px-3 py-2">{user.email}</td>
              <td className="border px-3 py-2 text-center">
                {user.emailVerified ? "✅" : "❌"}
              </td>

              <td className="border px-3 py-2 text-center">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : user.status === "BANNED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className="border px-3 py-2 text-center">
                <select
                  value={user.status}
                  disabled={loadingId === user.id}
                  onChange={(e) =>
                    updateStatus(user.id, e.target.value as User["status"])
                  }
                  className="border px-2 py-1"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BANNED">BANNED</option>
                  <option value="SUSPENDED">SUSPENDED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
