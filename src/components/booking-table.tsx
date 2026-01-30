"use client";

export default function AdminBookingTable({ bookings }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2 text-left">Booking ID</th>
            <th className="border px-3 py-2 text-left">Student ID</th>
            <th className="border px-3 py-2 text-left">Tutor ID</th>
            <th className="border px-3 py-2">Session Date</th>
            <th className="border px-3 py-2">Start Time</th>
            <th className="border px-3 py-2">End Time</th>
            <th className="border px-3 py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings?.data?.length === 0 && (
            <tr>
              <td colSpan={8} className="border px-3 py-4 text-center">
                No bookings found
              </td>
            </tr>
          )}

          {bookings?.data?.map((booking, index) => (
            <tr key={booking.id}>
              <td className="border px-3 py-2 text-center">{index + 1}</td>
              <td className="border px-3 py-2">{booking.id}</td>
              <td className="border px-3 py-2">{booking.studentId}</td>
              <td className="border px-3 py-2">{booking.tutorId}</td>
              <td className="border px-3 py-2 text-center">
                {new Date(booking.sessionDate).toLocaleDateString()}
              </td>
              <td className="border px-3 py-2 text-center">
                {booking.startTime}
              </td>
              <td className="border px-3 py-2 text-center">
                {booking.endTime || "-"}
              </td>
              <td className="border px-3 py-2 text-center">
                {booking.status || "CONFIRMED"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
