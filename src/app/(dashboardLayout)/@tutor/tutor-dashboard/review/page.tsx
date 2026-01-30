import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tutorService } from "@/tutor.service";
import { Star } from "lucide-react";

export default async function MyTutorPage() {
  const { data: profile } = await tutorService.getTutorProfile();

  const tutor = profile?.data?.[0];
  const reviews = tutor?.reviews || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Tutor Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 mt-4">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">
                    {r.student?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    {r.rating}
                  </TableCell>
                  <TableCell>{r.comment}</TableCell>
                  <TableCell>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
