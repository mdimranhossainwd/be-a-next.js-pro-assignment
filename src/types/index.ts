export type { Router } from "./routes";

export interface TutorAvailability {
  days: string[];
  hours: string[];
}

export interface TutorCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

export interface Tutor {
  id: string;
  title: string;
  bio: string;
  hourlyRate: number;
  experienceYears: number;
  subjects: string[];
  avgRating: number;
  totalReviews: number;
  isVerified: boolean;

  categoryId: string;
  userId: string;

  availability: TutorAvailability;

  createdAt: string;
  updatedAt: string;

  category: TutorCategory;

  bookings: [];
}
