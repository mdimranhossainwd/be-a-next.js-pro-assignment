"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";

type Role = "STUDENT" | "TUTOR";

const Signup = ({
  heading = "Please Create an Account",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://i.ibb.co.com/QjczW4vb/145855843-8e8d722b-6a0a-4da0-9ca2-3aba986f49e9-removebg-preview.png",
    alt: "logo",
    title: "Skill-Bridge",
  },
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "/login",
  className,
}: any) => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT" as Role,
    },

    onSubmit: async ({ value }) => {
      console.log("Final Data:", value);

      await authClient.signUp.email({
        email: value.email,
        name: value.name,
        password: value.password,
        role: value.role,
      } as any);
    },
  });

  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border bg-background px-6 py-8 shadow-md"
          >
            <h1 className="text-xl font-semibold">{heading}</h1>

            {/* Name */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? "Name must be at least 2 characters"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="w-full">
                  <Input
                    placeholder="Your Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value.includes("@") ? "Invalid email" : undefined,
              }}
            >
              {(field) => (
                <div className="w-full">
                  <Input
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Password */}
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
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">
                      {field.state.meta.errors}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Role */}
            <form.Field name="role">
              {(field) => (
                <div className="w-full">
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as Role)}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="TUTOR">Tutor</option>
                  </select>
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

          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="font-medium text-primary hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Signup };
