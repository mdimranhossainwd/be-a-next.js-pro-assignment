// app/(dashboard)/my-booking/page.tsx
import { DataTable1 } from "@/components/data-table1";
import { bookingService } from "@/service/booking.service";

export default async function MyTutorBooking() {
  const { data: bookings } = await bookingService.getTutorBookings();
  console.log(bookings);

  return <DataTable1 bookings={bookings} />;
}
