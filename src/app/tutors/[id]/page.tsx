import Footer from "@/components/layout/footer";
import { Header } from "@/components/layout/navbar";
import { BookingForm } from "@/components/tutors/booking-form";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/lib/env";
import type { Review, TutorProfile } from "@/types/api";
import { BookOpen, Clock, DollarSign, Mail, Star } from "lucide-react";
import { notFound } from "next/navigation";

async function getTutor(id: string) {
  try {
    const API_URL = env.NEXT_PUBLIC_BACKEND_URL;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_URL}/tutors/${id}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Error fetching tutor:", error);
    return null;
  }
}

async function getTutorReviews(profileId: string, userId: string) {
  try {
    const API_URL = env.NEXT_PUBLIC_BACKEND_URL;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const fetchReviews = async (id: string) => {
      try {
        const response = await fetch(`${API_URL}/reviews/tutor/${id}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) return null;

        const data = await response.json();
        const payload = data.data;
        if (Array.isArray(payload)) return payload as Review[];
        if (payload?.reviews && Array.isArray(payload.reviews))
          return payload.reviews as Review[];
        return [];
      } catch {
        return null;
      }
    };

    // Try profileId first, then userId
    const reviewsByProfile = await fetchReviews(profileId);
    if (reviewsByProfile && reviewsByProfile.length > 0) {
      clearTimeout(timeoutId);
      return reviewsByProfile;
    }
    const reviewsByUser = await fetchReviews(userId);
    clearTimeout(timeoutId);
    return reviewsByUser || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = (await getTutor(id)) as TutorProfile | null;

  if (!tutor) {
    notFound();
  }

  const reviews = await getTutorReviews(tutor.id, tutor.userId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tutor Header */}
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0 shadow-lg" />
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2 text-foreground">
                        {tutor.user?.name || "Anonymous Tutor"}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold text-foreground">
                            {tutor.averageRating?.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-muted-foreground font-medium">
                            ({tutor.totalReviews || 0} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                          <Mail className="h-4 w-4 text-primary" />
                          <span>{tutor.user?.email}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(tutor.subjects || []).map((subject: string) => (
                          <span
                            key={subject}
                            className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {tutor.bio || "This tutor hasn't added a bio yet."}
                  </p>
                </CardContent>
              </Card>

              {/* Availability Section */}
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      Availability
                    </h2>
                  </div>
                  {!tutor.availability ||
                  Object.keys(tutor.availability).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8 font-medium">
                      No availability set yet
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ].map((day) => {
                        const slots = tutor.availability?.[day] || [];
                        const hasSlots = slots.length > 0;

                        return (
                          <div
                            key={day}
                            className={`p-4 rounded-xl border-2 transition-colors ${
                              hasSlots
                                ? "border-primary/20 bg-primary/5"
                                : "border-border bg-muted/30"
                            }`}
                          >
                            <h3 className="font-bold text-xs uppercase tracking-widest mb-3 text-muted-foreground">
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </h3>
                            {hasSlots ? (
                              <div className="space-y-2">
                                {slots.map((slot, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <Clock className="h-3.5 w-3.5 text-primary/70" />
                                    <span className="text-foreground font-bold">
                                      {slot}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground/40 text-xs italic font-medium">
                                Not available
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-border bg-card hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Hourly Rate
                        </p>
                        <p className="text-2xl font-black text-primary">
                          ${tutor.hourlyRate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card hover:border-violet-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                        <Star className="h-6 w-6 text-violet-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Rating
                        </p>
                        <p className="text-2xl font-black text-violet-500">
                          {tutor.averageRating?.toFixed(1) || "0.0"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card hover:border-emerald-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Reviews
                        </p>
                        <p className="text-2xl font-black text-emerald-500">
                          {tutor.totalReviews || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews Section */}
              <Card className="border-border bg-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    Reviews
                  </h2>
                  {reviews.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8 font-medium">
                      No reviews yet
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-border pb-6 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0 shadow-sm" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p className="font-bold text-foreground">
                                  {review.student?.name || "Anonymous"}
                                </p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted border-border"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              {review.comment ? (
                                <p className="text-muted-foreground leading-relaxed font-medium">
                                  {review.comment}
                                </p>
                              ) : null}
                              <p className="text-sm text-muted-foreground/60 mt-2 font-medium">
                                {new Date(
                                  review.createdAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingForm
                  tutorId={tutor.id}
                  tutorName={tutor.user?.name || "this tutor"}
                  hourlyRate={tutor.hourlyRate}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
