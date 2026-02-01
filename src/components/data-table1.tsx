"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export const DataTable1 = ({ bookings }) => {
  const [localBookings, setLocalBookings] = useState(bookings?.data || []);
  const [loadingId, setLoadingId] = useState(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const isSessionOver = (sessionDate, endTime) => {
    const end = new Date(sessionDate);
    const [hour, min] = endTime.split(":");
    end.setHours(hour, min);
    return new Date() > end;
  };

  const handleCancel = async (bookingId) => {
    try {
      setLoadingId(bookingId);
      const res = await fetch(
        `https://be-a-prisma-pro-assignment.vercel.app/api/v1/booking/${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "CANCELLED" }),
        },
      );
      if (!res.ok) throw new Error("Failed to cancel booking");

      setLocalBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "CANCELLED" } : b,
        ),
      );
      toast.success("Booking cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Could not cancel booking. Try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const openReviewModal = (booking) => {
    setCurrentBooking(booking);
    setRating(0);
    setComment("");
    setReviewModalOpen(true);
  };

  const submitReview = async () => {
    if (!rating || !comment)
      return toast.error("Please provide rating & comment");

    try {
      const res = await fetch(
        `https://be-a-prisma-pro-assignment.vercel.app/api/v1/review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            bookingId: currentBooking.id,
            tutorId: currentBooking.tutor.id,
            rating,
            comment,
          }),
        },
      );
      if (!res.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted successfully!");
      setReviewModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Could not submit review");
    }
  };

  return (
    <section className="py-6 mx-5">
      <div className="container">
        <h2 className="text-3xl text-center font-bold mb-5">My Bookings </h2>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Booked At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {localBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                localBookings.map((b) => {
                  const sessionOver = isSessionOver(b.sessionDate, b.endTime);

                  return (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {b.student?.name}
                      </TableCell>
                      <TableCell>{b.tutor?.title}</TableCell>
                      <TableCell>
                        {new Date(b.sessionDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {b.startTime} - {b.endTime}
                      </TableCell>
                      <TableCell>
                        <select
                          value={b.status}
                          disabled={b.status !== "CONFIRMED"}
                          className={`border rounded px-2 py-1 text-sm ${
                            b.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : b.status === "COMPLETED"
                                ? "bg-green-100 text-green-700"
                                : ""
                          }`}
                          onChange={() => handleCancel(b.id)}
                        >
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </TableCell>
                      <TableCell>$25/hr</TableCell>
                      <TableCell>
                        <Button
                          disabled={!sessionOver}
                          onClick={() => openReviewModal(b)}
                        >
                          Leave Review
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(b.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            b.status !== "CONFIRMED" || loadingId === b.id
                          }
                          onClick={() => handleCancel(b.id)}
                          className="px-3 py-1 text-sm"
                        >
                          {loadingId === b.id ? "Cancelling..." : "Cancel"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>

        <div className="mb-4">
          <label className="block mb-1">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded px-2 py-1"
            placeholder="Write your review here..."
          />
        </div>

        <Button onClick={submitReview}>Submit Review</Button>
      </Modal>
    </section>
  );
};
