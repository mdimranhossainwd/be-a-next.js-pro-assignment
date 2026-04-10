"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { bookingService } from "@/lib/services/booking.service";
import { reviewService } from "@/lib/services/review.service";
import type { Booking, CreateReviewRequest } from "@/types/api";
import { Calendar, Clock, DollarSign, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[] | { data: Booking[] }>([]);

  const [loading, setLoading] = useState(true);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewData, setReviewData] = useState<CreateReviewRequest>({
    tutorProfileId: "",
    rating: 5,
    comment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const bookingList: Booking[] = Array.isArray(bookings)
    ? bookings
    : Array.isArray(bookings?.data)
      ? bookings.data
      : [];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    try {
      await bookingService.cancelBooking(id);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to cancel booking";
      toast.error(message);
    }
  };

  const handleCompleteBooking = async (id: string) => {
    try {
      await bookingService.completeBooking(id);
      toast.success("Booking completed successfully");
      fetchBookings();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to complete booking";
      toast.error(message);
    }
  };

  const openReviewDialog = (booking: Booking) => {
    const tutorProfileId = booking.tutor.tutorProfile?.id;
    if (!tutorProfileId) {
      toast.error("This tutor does not have a profile to review yet.");
      return;
    }
    setReviewBooking(booking);
    setReviewData({
      tutorProfileId,
      rating: 5,
      comment: "",
    });
  };

  const submitReview = async () => {
    setSubmittingReview(true);
    try {
      await reviewService.createReview(reviewData);
      toast.success("Review submitted. Thank you!");
      setReviewBooking(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error(
        "Unable to submit review. You can only review tutors after completing a session.",
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  const filterBookings = (status?: string) => {
    if (status === "upcoming") {
      return bookingList?.filter(
        (b) => b.status === "CONFIRMED" || b.status === "PENDING",
      );
    }
    if (status === "completed") {
      return bookingList?.filter((b) => b.status === "COMPLETED");
    }
    if (status === "cancelled") {
      return bookingList?.filter((b) => b.status === "CANCELLED");
    }
    return bookingList;
  };

  const renderBookingCard = (booking: Booking) => (
    <Card key={booking.id} className="border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0 shadow-md" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-foreground">
                {booking.tutor?.name || "Anonymous Tutor"}
              </h3>

              <div className="space-y-2 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(booking.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(booking.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(booking.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {booking.totalPrice && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-foreground font-bold">${booking.totalPrice}</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
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
          </div>

          <div className="flex flex-col gap-2 items-end">
            {(booking.status === "CONFIRMED" ||
              booking.status === "PENDING") && (
              <div className="flex flex-col gap-2">
                {booking.status === "CONFIRMED" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-500/10 border-green-200 dark:border-green-900 font-bold cursor-pointer"
                    onClick={() => handleCompleteBooking(booking.id)}
                  >
                    Mark Complete
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                  className="cursor-pointer font-bold"
                >
                  Cancel
                </Button>
              </div>
            )}
            {booking.status === "COMPLETED" && (
              <Button
                variant="outline"
                size="sm"
                className="font-bold border-border"
                onClick={() => openReviewDialog(booking)}
              >
                <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                Leave Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage your upcoming and past tutoring sessions
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-card data-[state=active]:text-foreground font-bold">All ({bookingList.length})</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-card data-[state=active]:text-foreground font-bold">
            Upcoming ({filterBookings("upcoming").length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-card data-[state=active]:text-foreground font-bold">
            Completed ({filterBookings("completed").length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="data-[state=active]:bg-card data-[state=active]:text-foreground font-bold">
            Cancelled ({filterBookings("cancelled").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {bookingList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">No bookings found</p>
            </div>
          ) : (
            filterBookings().map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {filterBookings("upcoming").length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">No upcoming bookings</p>
            </div>
          ) : (
            filterBookings("upcoming").map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {filterBookings("completed").length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">No completed bookings</p>
            </div>
          ) : (
            filterBookings("completed").map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4 mt-6">
          {filterBookings("cancelled").length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-medium">No cancelled bookings</p>
            </div>
          ) : (
            filterBookings("cancelled").map(renderBookingCard)
          )}
        </TabsContent>
      </Tabs>
      <Dialog
        open={!!reviewBooking}
        onOpenChange={(open) => !open && setReviewBooking(null)}
      >
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Leave a review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You&apos;re reviewing{" "}
              <span className="font-bold text-foreground">
                {reviewBooking?.tutor.name || "this tutor"}
              </span>
              .
            </p>
            <div className="space-y-2">
              <Label className="text-foreground font-bold">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setReviewData((prev) => ({ ...prev, rating: star }))
                    }
                    className={`text-2xl transition-transform hover:scale-125 ${
                      star <= reviewData.rating
                        ? "text-yellow-400"
                        : "text-muted border-border"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-foreground font-bold">Comment (optional)</Label>
              <Textarea
                id="comment"
                rows={3}
                placeholder="Share your experience with this tutor..."
                className="rounded-xl border-border bg-muted/50 focus:ring-primary/20"
                value={reviewData.comment || ""}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="font-bold border-border"
              onClick={() => setReviewBooking(null)}
              disabled={submittingReview}
            >
              Cancel
            </Button>
            <Button
              onClick={submitReview}
              disabled={submittingReview}
              className="bg-gradient-to-r from-blue-600 to-violet-600 font-bold text-white cursor-pointer shadow-lg shadow-primary/20"
            >
              {submittingReview ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
