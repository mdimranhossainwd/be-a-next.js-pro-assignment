"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const TutorProfileTable = ({ tutors }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const daysList = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    watch: watchEdit,
  } = useForm();

  const {
    register: registerAvailability,
    handleSubmit: handleAvailabilitySubmit,
    reset: resetAvailability,
    watch: watchAvailability,
  } = useForm();

  const handleEditClick = (tutor) => {
    setSelectedTutor(tutor);
    resetEdit({
      id: tutor.id,
      title: tutor.title,
      bio: tutor.bio,
      hourlyRate: tutor.hourlyRate,
      experienceYears: tutor.experienceYears,
      categoryId: tutor.categoryId || "",
      subjects: tutor.subjects.join(", "),
      availabilityDays: tutor.availability.days,
      availabilityHours: tutor.availability.hours,
      isVerified: tutor.isVerified,
    });
    setEditModalOpen(true);
  };

  const handleAvailabilityClick = (tutor) => {
    setSelectedTutor(tutor);
    resetAvailability({
      availabilityDays: tutor.availability.days,
      availabilityHours: tutor.availability.hours,
    });
    setAvailabilityModalOpen(true);
  };

  const onEditSubmit = async (values) => {
    try {
      const payload = {
        id: selectedTutor.id,
        title: values.title,
        bio: values.bio,
        hourlyRate: parseFloat(values.hourlyRate),
        experienceYears: parseInt(values.experienceYears),
        ...(values.categoryId && { categoryId: values.categoryId }),
        subjects: values.subjects
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        availability: {
          days: values.availabilityDays,
          hours: values.availabilityHours,
        },
        isVerified: values.isVerified,
      };

      const response = await fetch(`http://localhost:3000/api/v1/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (!response.ok) throw new Error("Failed to update");

      toast.success("Profile updated successfully!");
      setEditModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const onAvailabilitySubmit = async (values) => {
    try {
      const payload = {
        courseId: selectedTutor.id,
        availability: {
          days: values.availabilityDays,
          hours: values.availabilityHours,
        },
      };

      console.log("Sending Availability Payload:", payload);

      const response = await fetch(
        `http://localhost:3000/api/v1/availability`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Failed to update");

      toast.success("Availability updated successfully!");
      setAvailabilityModalOpen(false);
      window.location.reload(); // বা data refetch করুন
    } catch (err) {
      console.error(err);
      toast.error("Failed to update availability");
    }
  };

  const selectedEditDays = watchEdit("availabilityDays") || [];
  const selectedAvailabilityDays = watchAvailability("availabilityDays") || [];

  return (
    <>
      <section className="py-6 mx-5">
        <div className="container">
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {tutors?.data.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell className="font-medium">{tutor.title}</TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {tutor.subjects.slice(0, 3).map((subject, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {subject}
                          </Badge>
                        ))}
                        {tutor.subjects.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{tutor.subjects.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>{tutor.experienceYears} years</TableCell>

                    <TableCell className="font-semibold">
                      ${tutor.hourlyRate}/hr
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{tutor.avgRating}</span>
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-muted-foreground">
                          ({tutor.totalReviews})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {tutor.availability.days.slice(0, 2).join(", ")}
                          {tutor.availability.days.length > 2 && "..."}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {tutor.availability.hours[0]} -{" "}
                          {tutor.availability.hours[1]}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {tutor.isVerified ? (
                        <Badge variant="default" className="bg-green-500">
                          Verified ✓
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(tutor)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAvailabilityClick(tutor)}
                        >
                          Slot
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tutor Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit(onEditSubmit)} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                {...registerEdit("title")}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Bio</label>
              <textarea
                {...registerEdit("bio")}
                className="w-full border rounded px-3 py-2 h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">
                  Hourly Rate ($)
                </label>
                <input
                  {...registerEdit("hourlyRate")}
                  type="number"
                  step="0.01"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  Experience Years
                </label>
                <input
                  {...registerEdit("experienceYears")}
                  type="number"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Subjects (comma separated)
              </label>
              <input
                {...registerEdit("subjects")}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Available Days</label>
              <div className="flex flex-wrap gap-2">
                {daysList.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-1 border px-3 py-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={day}
                      {...registerEdit("availabilityDays")}
                      checked={selectedEditDays.includes(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Available Hours
              </label>
              <div className="flex gap-2">
                <input
                  type="time"
                  {...registerEdit("availabilityHours.0")}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="time"
                  {...registerEdit("availabilityHours.1")}
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={availabilityModalOpen}
        onOpenChange={setAvailabilityModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Availability</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleAvailabilitySubmit(onAvailabilitySubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block font-semibold mb-1">Available Days</label>
              <div className="flex flex-wrap gap-2">
                {daysList.map((day) => (
                  <label
                    key={day}
                    className="flex items-center gap-1 border px-3 py-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={day}
                      {...registerAvailability("availabilityDays")}
                      checked={selectedAvailabilityDays.includes(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Available Hours
              </label>
              <div className="flex gap-2">
                <input
                  type="time"
                  {...registerAvailability("availabilityHours.0")}
                  className="border rounded px-3 py-2 w-full"
                />
                <input
                  type="time"
                  {...registerAvailability("availabilityHours.1")}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAvailabilityModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
