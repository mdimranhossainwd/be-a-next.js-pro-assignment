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

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  sessionDate: string;
  startTime: string;
  endTime?: string;
  status?: string;
}

export interface AdminBookingTableProps {
  bookings: {
    data: Booking[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

// Define the props type
export interface CategoryTableProps {
  categories: Category[];
}
export interface Tutor {
  id: string;
  title: string;
  bio: string;
  subjects: string[];
  avgRating: number;
  totalReviews: number;
  hourlyRate: number;
  experienceYears: number;
  availability: {
    days: string[];
    hours: string[];
  };
  reviews: {
    id: string;
    student: { name: string };
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  isVerified: boolean;
}

export interface TutorReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface TutorProfile {
  id: string;
  userId: string;

  title: string;
  bio: string;

  subjects: string[];

  experienceYears: number;
  hourlyRate: number;

  availability: TutorAvailability;

  avgRating: number;
  totalReviews: number;
  isVerified: boolean;

  categoryId: string;
  category: TutorCategory;

  reviews: TutorReview[];

  createdAt: string;
  updatedAt: string;
}
