"use client";

import { AiInsightsCard } from "@/components/dashboard/ai-insights-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { bookingService } from "@/lib/services/booking.service";
import type { Booking } from "@/types/api";
import { Calendar, CheckCircle, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentDashboardPage() {
  const { user } = useAuth("STUDENT");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getMyBookings();
      const data = Array.isArray(response)
        ? response
        : (response as any)?.data || [];
      setBookings(data);
      setStats({
        total: data.length,
        upcoming: data.filter(
          (b: Booking) => b.status === "CONFIRMED" || b.status === "PENDING",
        ).length,
        completed: data?.filter((b: Booking) => b.status === "COMPLETED").length,
      });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.total}
          icon={Calendar}
          description="All time bookings"
        />
        <StatCard
          title="Upcoming Sessions"
          value={stats.upcoming}
          icon={Clock}
          description="Confirmed sessions"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          description="Finished sessions"
        />
      </div>

      {/* AI Insights */}
      <AiInsightsCard bookings={bookings} userName={user?.name} />

      {/* Recent Bookings */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Recent Bookings</CardTitle>
          <Link href="/dashboard/bookings">
            <Button variant="outline" size="sm" className="font-bold border-border">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4 font-medium">
                You haven&apos;t booked any sessions yet
              </p>
              <Link href="/tutors">
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 font-bold text-white">
                  Browse Tutors
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings?.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 shadow-md" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {booking.tutor?.name || "Anonymous Tutor"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.startTime).toLocaleString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : booking.status === "COMPLETED"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : booking.status === "CANCELLED"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/bookings`}>
                    <Button
                      className="cursor-pointer font-bold text-muted-foreground hover:text-primary transition-colors"
                      variant="ghost"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tutors">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 cursor-pointer">
                Find a Tutor
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="w-full cursor-pointer">
                View My Bookings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
