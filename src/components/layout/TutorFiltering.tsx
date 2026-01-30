"use client";

import Card from "@/components/ui/card";
import { Tutor } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TutorList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const showFilters = pathname === "/tutor";

  const [filters, setFilters] = useState({
    subject: searchParams.get("subjects") || "",
    category: searchParams.get("category") || "",
    rating: searchParams.get("rating") || "",
    price: searchParams.get("price") || "",
  });

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTutors = async () => {
    setLoading(true);
    setTutors([]);

    try {
      const category = searchParams.get("category") || "";
      const subject = searchParams.get("subjects") || "";
      const rating = searchParams.get("rating") || "";
      const price = searchParams.get("price") || "";

      const query = new URLSearchParams();
      if (category) query.append("category", category);
      if (subject) query.append("subjects", subject);
      if (rating) query.append("rating", rating);
      if (price) query.append("price", price);

      const res = await fetch(
        `http://localhost:3000/api/v1/tutor?${query.toString()}`,
      );
      const data = await res.json();

      setTutors(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error(err);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [searchParams]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.subject) params.set("subjects", filters.subject);
    else params.delete("subjects");

    if (filters.category) params.set("category", filters.category);
    else params.delete("category");

    if (filters.rating) params.set("rating", filters.rating);
    else params.delete("rating");

    if (filters.price) params.set("price", filters.price);
    else params.delete("price");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {showFilters && (
        <div className="mb-6 bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Subject
            </label>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="">All Subjects</option>
              <option value="javascript">JavaScript</option>
              <option value="node.js">Node.js</option>
              <option value="react">React</option>
              <option value="next.js">Next.js</option>
              <option value="express">Express</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="prisma">Prisma</option>
              <option value="go">Go</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Minimum Rating
            </label>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="">Any Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-1">
              Price Range
            </label>
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
            >
              <option value="">Any Price</option>
              <option value="0-20">$0 - $20</option>
              <option value="21-50">$21 - $50</option>
              <option value="51-100">$51 - $100</option>
            </select>
          </div>

          <div className="flex-none mt-3 md:mt-0">
            <button
              onClick={handleApplyFilters}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading tutors...</div>
      ) : tutors.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No tutors found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tutors.map((tutor) => (
            <Card key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
