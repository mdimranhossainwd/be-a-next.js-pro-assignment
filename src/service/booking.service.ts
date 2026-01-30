import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export const bookingService = {
  async getStudentBookings() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/booking`, {
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

  async getTutorBookings() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/tutor-booking`, {
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

  async getAllBookings(): Promise<ServiceResponse<any>> {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/all-bookings`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
        next: { revalidate: 30 },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch all bookings");
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Unable to fetch all bookings" },
      };
    }
  },

  async getBookingById(
    bookingId: string,
    token: string,
  ): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/booking/${bookingId}`, {
        headers: {
          Authorization: token,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Booking not found");
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Booking not found" },
      };
    }
  },

  async updateBookingStatus(
    bookingId: string,
    payload: any,
    token: string,
  ): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/booking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Booking update failed");
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Booking update failed" },
      };
    }
  },

  async completeBooking(
    bookingId: string,
    token: string,
  ): Promise<ServiceResponse<any>> {
    try {
      const res = await fetch(`${API_URL}/booking/complete/${bookingId}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to complete booking");
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Unable to complete booking" },
      };
    }
  },
};
