import { tutorService } from "@/tutor.service";
import { Star } from "lucide-react";

export default async function GetSinglePage({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) {
  const { tutorId } = await params;
  const { data } = await tutorService.getTutorById(tutorId);
  const tutor = data.data || {};
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Side: Tutor Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{tutor.title}</h1>
            {tutor.isVerified && (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Verified
              </div>
            )}
          </div>

          {/* Bio */}
          <p className="text-gray-600 mb-4">{tutor.bio}</p>

          {/* Subjects */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Subjects</h2>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((sub) => (
                <span
                  key={sub}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>{tutor.avgRating}</span>
              <span className="text-gray-500">
                ({tutor.totalReviews} reviews)
              </span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              ${tutor.hourlyRate}/hr
            </div>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Experience</h2>
            <p>{tutor.experienceYears}+ years</p>
          </div>

          {/* Availability */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Availability</h2>
            <p>{tutor.availability.days.join(", ")}</p>
            <p>{tutor.availability.hours.join(" - ")}</p>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Book a Session</h2>

          <form className="flex flex-col gap-4">
            {/* Date Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Time Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Time
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                {tutor.availability.hours.map((hour: string) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>

            {/* Name / Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
