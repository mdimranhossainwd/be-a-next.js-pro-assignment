import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(
        `https://be-a-prisma-pro-assignment.vercel.app/api/auth/get-session`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );

      const session = await res.json();

      console.log(session);

      if (!session || !session.user) {
        return { data: null, error: { message: "Session missing" } };
      }

      return { data: session.user, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
  getAllUsers: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://be-a-prisma-pro-assignment.vercel.app/api/v1/admin/users`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );
      const users = await res.json();
      if (users === null) {
        return { data: null, error: { message: "No users found." } };
      }
      return { data: users, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getCurrentUser: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `https://be-a-prisma-pro-assignment.vercel.app/api/v1/me`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
          cache: "no-store",
        },
      );
      const users = await res.json();
      if (users === null) {
        return { data: null, error: { message: "No users found." } };
      }
      return { data: users, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
