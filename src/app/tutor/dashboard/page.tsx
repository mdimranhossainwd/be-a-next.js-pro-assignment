"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { bookingService } from "@/lib/services/booking.service";
import type { Booking } from "@/types/api";
import { Calendar, DollarSign, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TutorDashboardPage() {
  const { user } = useAuth("TUTOR");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      console.log("bookings data:", data);
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const upcomingSessions = bookings?.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const totalEarnings = bookings
    ?.filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

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
        <p className="text-muted-foreground">Here&apos;s your teaching overview</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Sessions"
          value={upcomingSessions}
          icon={Calendar}
          description="Confirmed bookings"
        />
        <StatCard
          title="Total Earnings"
          value={`$${totalEarnings}`}
          icon={DollarSign}
          description="Completed sessions"
        />
        <StatCard
          title="Total Sessions"
          value={bookings.length}
          icon={Star}
          description="All time"
        />
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 font-medium">No sessions yet</p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 shadow-md" />
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {booking.student?.name || "Anonymous Student"}
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
                              : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  {booking.totalPrice && (
                    <div className="text-lg font-bold text-primary">
                      ${booking.totalPrice}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
