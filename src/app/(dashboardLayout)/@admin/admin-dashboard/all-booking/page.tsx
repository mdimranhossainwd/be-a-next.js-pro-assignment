import AdminBookingTable from "@/components/booking-table";
import { bookingService } from "@/service/booking.service";

export default async function AllBookingsPages() {
  const { data: bookings } = await bookingService.getAllBookings();

  return (
    <div>
      <AdminBookingTable bookings={bookings} />
    </div>
  );
}
