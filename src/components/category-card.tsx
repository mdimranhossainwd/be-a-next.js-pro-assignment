"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryCard({ category }: { category: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category.slug);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
    >
      <h3 className="font-semibold text-lg">{category.name}</h3>
    </div>
  );
}
