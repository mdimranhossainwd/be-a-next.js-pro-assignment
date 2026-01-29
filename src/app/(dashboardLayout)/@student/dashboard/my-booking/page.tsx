// app/(dashboard)/my-booking/page.tsx
import { DataTable1 } from "@/components/data-table1";
import { bookingService } from "@/service/booking.service";

export default async function MyBooking() {
  const { data: bookings } = await bookingService.getStudentBookings();
  console.log(bookings);

  return <DataTable1 bookings={bookings} />;
}
