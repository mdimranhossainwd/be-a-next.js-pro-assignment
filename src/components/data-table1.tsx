import { userService } from "@/service/user.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

const statusOptions = ["CONFIRMED", "CANCELLED", "COMPLETED"];

export const DataTable1 = async ({ bookings }) => {
  const isSessionOver = (sessionDate, endTime) => {
    const end = new Date(sessionDate);
    const [hour, min] = endTime.split(":");
    end.setHours(hour, min);

    return new Date() > end;
  };

  const { data } = await userService.getSession();

  const userInfo = data.user;

  return (
    <section className="py-6 mx-5">
      <div className="container">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                {userInfo.role !== "TUTOR" && <TableHead>Tutor</TableHead>}
                {/* <TableHead>Tutor</TableHead> */}
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
              {bookings?.data.map((b) => {
                const sessionOver = isSessionOver(b.sessionDate, b.endTime);

                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">
                      {b.student?.name}
                    </TableCell>

                    {userInfo.role !== "TUTOR" && (
                      <TableCell>{b.tutor?.title}</TableCell>
                    )}
                    <TableCell>
                      {new Date(b.sessionDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {b.startTime} - {b.endTime}
                    </TableCell>

                    {/* Status Dropdown */}
                    <TableCell>
                      <select
                        value={b.status}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </TableCell>

                    <TableCell>$25/hr</TableCell>

                    {/* Review Button */}
                    <TableCell>
                      <button
                        disabled={!sessionOver}
                        className={`px-3 py-1 rounded text-sm ${
                          sessionOver
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        Leave Review
                      </button>
                    </TableCell>

                    <TableCell>
                      {new Date(b.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                    <Button>Update</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
