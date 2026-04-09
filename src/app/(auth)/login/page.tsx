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
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-70"></div>
      
      <Card className="w-full max-w-md border-border bg-card shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="space-y-4 pt-10">
          <Link href="/" className="flex justify-center mb-2">
            <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SkillBridge</span>
          </Link>
          <CardTitle className="text-3xl font-black text-center text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-center text-muted-foreground text-lg">
            Choose a quick login or enter your details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 px-8">
          {/* Quick Login Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin("ADMIN")}
              className="flex-1 h-14 rounded-2xl border-border bg-muted/30 hover:bg-primary/5 hover:border-primary/50 transition-all font-bold gap-2"
              disabled={isLoading}
            >
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Admin Login
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleQuickLogin("TUTOR")}
              className="flex-1 h-14 rounded-2xl border-border bg-muted/30 hover:bg-purple-500/5 hover:border-purple-500/50 transition-all font-bold gap-2"
              disabled={isLoading}
            >
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              Tutor Login
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground font-bold tracking-widest">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold ml-1 text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-12 rounded-xl bg-muted/50 border-border focus:ring-primary/20"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs font-bold text-red-500 ml-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" dir="rtl" className="font-bold ml-1 text-muted-foreground flex justify-between w-full">
                <span>Password</span>
                <Link href="#" className="text-xs text-primary hover:underline">Forgot?</Link>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl bg-muted/50 border-border focus:ring-primary/20"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-xs font-bold text-red-500 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full h-14 text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-primary/20 transition-all rounded-2xl text-white mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In to Your Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pb-10 pt-4 flex justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            New here?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline font-bold"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
