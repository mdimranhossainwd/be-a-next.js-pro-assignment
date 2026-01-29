import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
export default function Card({ tutor }) {
  console.log(tutor);
  return (
    <div>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="relative">
          {tutor.isVerified && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {/* <BadgeCheck className="h-4 w-4" /> */}
              Verified
            </div>
          )}

          <div className="py-10 text-center bg-gradient-to-br from-blue-100 to-purple-100">
            <h3 className="text-xl font-bold text-gray-800">{tutor.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {tutor.experienceYears}+ years experience
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tutor.bio}</p>

          {/* Subjects */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tutor.subjects.slice(0, 4).map((subject) => (
              <span
                key={subject}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {subject}
              </span>
            ))}
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-semibold text-gray-800">
                {tutor.avgRating}
              </span>
              <span className="ml-1 text-gray-500 text-sm">
                ({tutor.totalReviews})
              </span>
            </div>

            <div className="text-xl font-bold text-blue-600">
              ${tutor.hourlyRate}/hr
            </div>
          </div>

          {/* Availability */}
          <div className="text-sm text-gray-600 mb-4">
            <p className="font-medium text-gray-700">Availability</p>
            <p>
              {tutor.availability.days.join(", ")} <br />
              {tutor.availability.hours.join(" - ")}
            </p>
          </div>

          {/* CTA */}
          <Link href={`/tutor/${tutor.id}`}>
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center">
              View Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
