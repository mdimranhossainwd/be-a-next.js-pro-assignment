"use client";

import { useState } from "react";
import { toast } from "sonner";

type Category = {
  name: string;
  slug: string;
  isActive: boolean;
};

export default function CategoryTable({ categories }) {
  const [list, setList] = useState<Category[]>(categories || []);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  const openEdit = (cat: Category) => {
    setSelected(cat);
    setOpen(true);
  };

  const updateCategory = async () => {
    if (!selected) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/v1/categories/${selected.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: selected.name,
            slug: selected.slug,
            isActive: selected.isActive,
          }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      setList((prev) => prev.map((c) => (c.id === selected.id ? selected : c)));

      setOpen(false);
      toast.success("Category Update Successfully");
    } catch (err) {
      toast.error("Category Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Delete failed");

      setList((prev) => prev.filter((c) => c.id !== id));
      toast.success("Deleted Successfully");
    } catch {
      toast.error("Delete failed");
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
              <th className="border px-3 py-2 text-left">Slug</th>
              <th className="border px-3 py-2">Active</th>
              <th className="border px-3 py-2">Created</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((cat, i) => (
              <tr key={cat.id}>
                <td className="border px-3 py-2 text-center">{i + 1}</td>
                <td className="border px-3 py-2">{cat.name}</td>
                <td className="border px-3 py-2">{cat.slug}</td>
                <td className="border px-3 py-2 text-center">
                  {cat.isActive ? "✅" : "❌"}
                </td>
                <td className="border px-3 py-2 text-center">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => openEdit(cat)}
                    className="px-2 py-1 border"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="px-2 py-1 border text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 p-4 rounded space-y-3">
            <h2 className="font-semibold text-lg">Edit Category</h2>

            <input
              className="border w-full px-2 py-1"
              value={selected.name}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="border w-full px-2 py-1"
              value={selected.slug}
              onChange={(e) =>
                setSelected({ ...selected, slug: e.target.value })
              }
              placeholder="Slug"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.isActive}
                onChange={(e) =>
                  setSelected({ ...selected, isActive: e.target.checked })
                }
              />
              Active
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={updateCategory}
                className="border px-3 py-1 bg-black text-white"
              >
                {loading ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
