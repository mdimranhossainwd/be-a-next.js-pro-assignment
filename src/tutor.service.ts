import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export const tutorService = {
  async getAllTutors(): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/tutor`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch tutors");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Unable to load tutors" },
      };
    }
  },

  async getTutorProfile() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/my-tutors`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Unable to fetch student bookings" },
      };
    }
  },

  async getTutorById(tutorId: string): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/tutor/${tutorId}`, {
        next: { revalidate: 120 },
      });

      if (!res.ok) {
        throw new Error("Tutor not found");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Tutor not found" },
      };
    }
  },

  async createTutor(
    payload: any,
    token: string,
  ): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/tutor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create tutor");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Tutor creation failed" },
      };
    }
  },

  async updateProfile(
    payload: any,
    token: string,
  ): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Profile update failed");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Profile update failed" },
      };
    }
  },

  async updateAvailability(
    payload: any,
    token: string,
  ): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Availability update failed");
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Availability update failed" },
      };
    }
  },
};
