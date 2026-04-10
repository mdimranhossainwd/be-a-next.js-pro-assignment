"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleQuickLogin = (role: "ADMIN" | "TUTOR") => {
    if (role === "ADMIN") {
      setValue("email", "mdimranhossain.wd@gmail.com");
      setValue("password", "password1234");
    } else {
      setValue("email", "mdalaminmian@gmail.com");
      setValue("password", "password1234");
    }
    // We don't automatically submit to let the user see what happened, 
    // but the user asked for "click korle login hobe", so I will submit it.
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data);
      toast.success("Login successful!");

      // Redirect based on user role
      const user = response.user;

      setTimeout(() => {
        let targetUrl = "/dashboard";
        if (user?.role === "ADMIN") {
          targetUrl = "/admin";
        } else if (user?.role === "TUTOR") {
          targetUrl = "/tutor/dashboard";
        }

        window.location.href = targetUrl;
      }, 500);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-slate-950">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4"></div>
          <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Quick Login Buttons */}
            <div className="flex gap-3 mb-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleQuickLogin("ADMIN")}
                className="flex-1 h-11 text-xs font-bold border-gray-200 dark:border-gray-800"
                disabled={isLoading}
              >
                Admin Quick Login
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleQuickLogin("TUTOR")}
                className="flex-1 h-11 text-xs font-bold border-gray-200 dark:border-gray-800"
                disabled={isLoading}
              >
                Tutor Quick Login
              </Button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <span className="relative bg-white dark:bg-slate-950 px-2 text-xs text-gray-500 uppercase">Or</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 mt-5 cursor-pointer dark:text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-sm text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
