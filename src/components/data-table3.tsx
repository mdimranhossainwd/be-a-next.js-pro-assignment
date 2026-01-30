"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const DataTable3 = ({ bookings }) => {
  const [localBookings, setLocalBookings] = useState(bookings?.data || []);
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusChange = async (bookingId, newStatus) => {
    if (newStatus !== "COMPLETED") return;

    try {
      setLoadingId(bookingId);

      const res = await fetch(
        `http://localhost:3000/api/v1/booking/complete/${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "COMPLETED" }),
        },
      );

      if (!res.ok) throw new Error("Failed to update booking");

      setLocalBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "COMPLETED" } : b,
        ),
      );

      toast.success("Booking marked as COMPLETED!");
    } catch (err) {
      console.error(err);
      toast.error("Could not update booking. Try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="py-6 mx-5">
      <div className="container">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Booked At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {localBookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">
                    {b.student?.name}
                  </TableCell>
                  <TableCell>
                    {new Date(b.sessionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {b.startTime} - {b.endTime}
                  </TableCell>

                  <TableCell>
                    <select
                      value={b.status}
                      disabled={loadingId === b.id || b.status === "CANCELLED"}
                      className={`border rounded px-2 py-1 text-sm ${
                        b.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    >
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </TableCell>

                  <TableCell>$25/hr</TableCell>
                  <TableCell>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
