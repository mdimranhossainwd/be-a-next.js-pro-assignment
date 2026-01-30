import BookingForm from "@/components/booking-form";
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
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{tutor.title}</h1>
            {tutor.isVerified && (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Verified
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-4">{tutor.bio}</p>

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

          <div className="mb-4">
            <h2 className="font-semibold mb-1">Experience</h2>
            <p>{tutor.experienceYears}+ years</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-1">Availability</h2>
            <p>{tutor.availability.days.join(", ")}</p>
            <p>{tutor.availability.hours.join(" - ")}</p>
          </div>
        </div>

        <BookingForm tutorId={tutor.id} availability={tutor.availability} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>

        {tutor.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutor.reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-xl p-4 shadow-md bg-white flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.student.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold">
                      {review.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-3 flex-grow">{review.comment}</p>

                <p className="text-gray-400 text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
