import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export const bookingService = {
  // 🔹 Create booking (Any authenticated user – usually Student)
  // async createBooking(payload: any): Promise<ServiceResponse<any>> {
  //   try {
  //     const res = await fetch(`${API_URL}/booking`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //       cache: "no-store", // always dynamic
  //     });

  //     if (!res.ok) {
  //       throw new Error("Booking creation failed");
  //     }

  //     const data = await res.json();
  //     return { data, error: null };
  //   } catch {
  //     return {
  //       data: null,
  //       error: { message: "Unable to create booking" },
  //     };
  //   }
  // },

  // 🔹 Student: Get my bookings
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

  // 🔹 Tutor: Get tutor bookings
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

  // 🔹 Admin / Public: Get all bookings
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

  // 🔹 Get booking by ID (auth)
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

  // 🔹 Update booking status (auth)
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

  // 🔹 Tutor: Complete booking
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
