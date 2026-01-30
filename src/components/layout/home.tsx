"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeSection() {
  const router = useRouter();
  const [subject, setSubject] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = new URLSearchParams();
    query.append("subjects", subject.trim().toLowerCase());

    router.push(`?subjects=${subject.trim().toLowerCase()}`);
  };

  return (
    <section className="py-10 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="mx-auto px-4 text-center">
        <h1 className="bg-gradient-to-r md:text-6xl font-bold from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Find Your Perfect <br /> Tutor
        </h1>

        <div className="md:max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <input
              type="text"
              placeholder="Search by subject (e.g., JavaScript)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
