"use client";

import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export default function TutorProfileForm() {
  const { data: session } = authClient.useSession();
  console.log(session);

  const daysList = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      title: "",
      bio: "",
      hourlyRate: "",
      experienceYears: "",
      categoryId: "",
      subjects: "",
      availabilityDays: [] as string[],
      availabilityHours: ["", ""],
      isVerified: false,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      if (!session) {
        toast.error("Please login first");
        return;
      }

      const payload = {
        title: values.title,
        bio: values.bio,
        hourlyRate: parseFloat(values.hourlyRate),
        experienceYears: parseInt(values.experienceYears),
        categoryId: values.categoryId,
        subjects: values.subjects
          .split(",")
          .map((s: string) => s.trim())
          .filter((s: string) => s),
        availability: {
          days: values.availabilityDays,
          hours: [
            `${values.availabilityHours[0].padStart(5, "0")}-${values.availabilityHours[1].padStart(5, "0")}`,
          ],
        },
        isVerified: values.isVerified,
      };
      console.log("Payload:", payload);
      const response = await fetch(
        "https://be-a-prisma-pro-assignment.vercel.app/api/v1/tutor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      console.log("Backend Response:", data);

      if (!response.ok) {
        toast.error(data.message || "Failed to submit");
        return;
      }

      toast.success("Tutor profile submitted!");
    } catch (err) {
      console.error("Error details:", err);
      toast.error("Error submitting form");
    }
  };

  const selectedDays = watch("availabilityDays");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">
        Tutor Profile Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            {...register("title")}
            placeholder="Enter your title"
            className="input w-full border py-2 px-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            {...register("bio")}
            placeholder="Write a short bio"
            className="input w-full h-24  border py-2 px-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Hourly Rate ($)</label>
            <input
              {...register("hourlyRate")}
              type="number"
              placeholder="e.g. 35.5"
              className="input w-full border py-2 px-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Experience Years</label>
            <input
              {...register("experienceYears")}
              type="number"
              placeholder="e.g. 5"
              className="input w-full border py-2 px-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Category ID (Must be Provided)
          </label>
          <input
            {...register("categoryId")}
            placeholder="Enter category ID"
            className="input w-full border py-2 px-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Subjects</label>
          <input
            {...register("subjects")}
            placeholder="Enter subjects separated by commas"
            className="input w-full border py-2 px-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Available Days (Select 2-3)
          </label>
          <div className="flex flex-wrap gap-2">
            {daysList.map((day) => (
              <label
                key={day}
                className="flex items-center gap-1 border px-3 py-1 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={day}
                  {...register("availabilityDays")}
                  checked={selectedDays.includes(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Available Hours</label>
          <div className="flex gap-2">
            <input
              type="time"
              {...register("availabilityHours.0")}
              className="input border py-2 px-2"
            />
            <input
              type="time"
              {...register("availabilityHours.1")}
              className="input border py-2 px-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isVerified")} />
          <label>Verified Tutor</label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
}
