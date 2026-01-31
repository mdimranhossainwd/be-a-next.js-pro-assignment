"use client";

import { env } from "@/env";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

export const authClient = createAuthClient({
  //you can pass client configuration here
  // baseURL: `${AUTH_URL}/api/auth`,
  // fetchOptions: {
  //   credentials: "include",
  // },
});
