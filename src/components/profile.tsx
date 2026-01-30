"use client";

import { useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function UserTable({ users }) {
  const [list, setList] = useState<User[]>(users || []);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  console.log(list);

  const openEdit = (user: User) => {
    setSelected(user);
    setOpen(true);
  };

  const updateName = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/v1/name/${selected.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name: selected.name }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      toast.success("Your name has been updated successfully.");

      setOpen(false);
    } catch {
      toast.error("Name updated failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border px-3 py-2 text-center"></td>
              <td className="border px-3 py-2">{list?.name}</td>
              <td className="border px-3 py-2">{list?.email}</td>
              <td className="border px-3 py-2 text-center">{list?.role}</td>
              <td className="border px-3 py-2 text-center">{list?.status}</td>
              <td className="border px-3 py-2 text-center">
                <button
                  onClick={() => openEdit(list)}
                  className="border px-3 py-1"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {open && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 p-4 rounded space-y-4">
            <h2 className="font-semibold text-lg">Update Name</h2>

            <input
              className="border w-full px-3 py-2"
              value={selected.name}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
            />

            <input
              className="border w-full px-3 py-2 bg-gray-100"
              value={selected.email}
              disabled
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={updateName}
                className="border px-3 py-1 bg-black text-white"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
