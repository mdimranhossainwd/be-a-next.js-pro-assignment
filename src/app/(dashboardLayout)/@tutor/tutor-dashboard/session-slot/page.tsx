// app/(dashboard)/my-booking/page.tsx
import { DataTable3 } from "@/components/data-table3";
import { bookingService } from "@/service/booking.service";

export default async function MyTutorBooking() {
  const { data: bookings } = await bookingService.getTutorBookings();
  console.log(bookings);

  return;

  <DataTable3 bookings={bookings} />;
}
