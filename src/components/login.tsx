"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginProps {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Login = ({
  heading = "Welcome, To Login",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://i.ibb.co.com/QjczW4vb/145855843-8e8d722b-6a0a-4da0-9ca2-3aba986f49e9-removebg-preview.png",
    alt: "logo",
    title: "Skill-Bridge",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "/register",
  className,
}: LoginProps) => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });
        toast.success("Login successful!");
        router.push("/");
      } catch (err: any) {
        toast.error(err.message || "Login failed");
      }
    },
  });

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* Logo */}
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a>

          {/* Login Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border bg-background px-6 py-8 shadow-md"
          >
            <h1 className="text-xl font-semibold">{heading}</h1>

            {/* Email Field */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value.includes("@") ? "Invalid email address" : undefined,
              }}
            >
              {(field) => (
                <div className="w-full">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="text-sm"
                    required
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password Field */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  value.length < 6
                    ? "Password must be at least 6 characters"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="w-full">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="text-sm"
                    required
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <Button
              type="submit"
              className="w-full"
              disabled={!form.state.isValid}
            >
              {buttonText}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <Link
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
