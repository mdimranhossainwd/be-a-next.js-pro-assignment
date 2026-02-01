import AdminBookingTable from "@/components/booking-table";
import { bookingService } from "@/service/booking.service";

export default async function AllBookingsPages() {
  const { data: bookings } = await bookingService.getAllBookings();

  return (
    <div>
      <div className="text-3xl font-bold text-center py-3">
        <h2>All Bookings</h2>
      </div>
      <AdminBookingTable bookings={bookings} />
    </div>
  );
}
