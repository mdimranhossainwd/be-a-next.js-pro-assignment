"use client";

import Card from "@/components/ui/card";
import { Tutor } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TutorList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL
  const [filters, setFilters] = useState({
    subject: searchParams.get("category") || "",
    rating: searchParams.get("rating") || "",
    price: searchParams.get("price") || "",
  });

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch tutors with current filters
  const fetchTutors = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (filters.subject) query.append("subjects", filters.subject);
      if (filters.rating) query.append("rating", filters.rating);
      if (filters.price) query.append("price", filters.price);

      // Update URL without reload
      router.replace(`?${query.toString()}`, { scroll: false });

      const url = `http://localhost:3000/api/v1/tutor?${query.toString()}`;
      const res = await fetch(url);
      const data = await res.json();

      setTutors(data?.data || []);
    } catch (err) {
      console.error(err);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyFilters = () => {
    fetchTutors();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filter Section */}
      <div className="mb-6 bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Subject */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Subject
          </label>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        {/* Rating */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Minimum Rating
          </label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Any Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Price Range
          </label>
          <select
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Tutor Cards */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading tutors...</div>
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
