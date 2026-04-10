"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingService } from "@/lib/services/booking.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const bookingSchema = z.object({
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  tutorId: string;
  tutorName: string;
  hourlyRate: number;
}

export function BookingForm({
  tutorId,
  tutorName,
  hourlyRate,
}: BookingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // We compute ISO datetimes on submit; keep form validation simple.
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setValue("startTime", time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    setValue("endTime", time);
  };

  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;
    const start = parseInt(startTime.split(":")[0]);
    const end = parseInt(endTime.split(":")[0]);
    return Math.max(0, end - start);
  };

  const totalCost = calculateDuration() * hourlyRate;

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      if (!selectedDate) {
        toast.error("Please select a date");
        return;
      }

      const [startH, startM] = data.startTime.split(":").map(Number);
      const [endH, endM] = data.endTime.split(":").map(Number);

      const start = new Date(selectedDate);
      start.setHours(startH, startM, 0, 0);

      const end = new Date(selectedDate);
      end.setHours(endH, endM, 0, 0);

      console.log("📅 Selected Date:", selectedDate);
      console.log("⏰ Start Time:", data.startTime);
      console.log("⏰ End Time:", data.endTime);

      console.log(typeof tutorId);

      const payload = {
        tutorId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      };

      const response = await bookingService.createBooking(payload);
      console.log(response);

      toast.success("Booking created successfully!");
      router.push("/dashboard/bookings");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create booking";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="text-foreground">Book a Session</CardTitle>
        <CardDescription className="text-muted-foreground font-medium">
          Book a tutoring session with {tutorName}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground font-bold ml-1">
              Select Date
            </Label>
            <div className="p-1 rounded-xl border border-border bg-muted/20">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date()}
                className="rounded-lg bg-card text-foreground"
              />
            </div>
            {errors.startTime && (
              <p className="text-sm font-bold text-destructive">
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground font-bold ml-1">
                Start Time
              </Label>
              <Select
                onValueChange={handleStartTimeChange}
                disabled={!selectedDate}
              >
                <SelectTrigger className="rounded-xl border-border bg-muted/50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-bold ml-1">End Time</Label>
              <Select onValueChange={handleEndTimeChange} disabled={!startTime}>
                <SelectTrigger className="rounded-xl border-border bg-muted/50">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {timeSlots.map((time) => (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={time <= startTime}
                    >
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.endTime && (
                <p className="text-sm font-bold text-destructive">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Selected:{" "}
              <span className="font-bold text-foreground">
                {selectedDate ? format(selectedDate, "PPP") : "—"}
              </span>
            </p>
          </div>

          {totalCost > 0 && (
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-medium">
                  Duration:
                </span>
                <span className="font-bold text-foreground">
                  {calculateDuration()} hour(s)
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-primary/10">
                <span className="text-sm text-muted-foreground font-medium">
                  Total Cost:
                </span>
                <span className="text-2xl font-black text-primary">
                  ${totalCost}
                </span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 h-12 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 cursor-pointer"
            disabled={isLoading || !selectedDate || !startTime || !endTime}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
