"use client";

import { useForm } from "react-hook-form";

type CategoryFormData = {
  name: string;
  slug: string;
  isActive: boolean;
};

export default function CategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const res = await fetch(
        `https://be-a-prisma-pro-assignment.vercel.app/api/v1/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to create category");
      }

      const result = await res.json();
      console.log("Category created:", result);

      reset();
      alert("Category created successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="border px-3 py-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input
          type="text"
          {...register("slug", { required: "Slug is required" })}
          className="border px-3 py-2 w-full"
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isActive")} />
        <label>Is Active</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2"
      >
        {isSubmitting ? "Saving..." : "Create Category"}
      </button>
    </form>
  );
}
