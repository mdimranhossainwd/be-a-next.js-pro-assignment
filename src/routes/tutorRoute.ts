import { Router } from "@/types";

export const tutorRoute: Router[] = [
  {
    title: "Tutor Dashboard",
    items: [
      {
        title: "Add Tutor",
        url: "/tutor-dashboard/add-tutor",
      },
      {
        title: "My Tutor",
        url: "/tutor-dashboard/my-tutor",
      },
      {
        title: "Review",
        url: "/tutor-dashboard/review",
      },
    ],
  },
];
