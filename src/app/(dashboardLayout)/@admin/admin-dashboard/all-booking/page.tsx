import { bookingService } from "@/service/booking.service";

export default async function AllBookingsPages() {
  const { data: users } = await bookingService.getAllBookings();
  console.log(users);

  return <div></div>;
}
