"use client";

import React from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const SignIn = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Sign in failed", {
        description:
          error instanceof Error ? error.message : 'Failed to sign in'
      });
    }
  };

  return (
    <div>
      <h1 className="form-title">Log In Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputField
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: 8,
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing in..." : "Log In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />

      </form>
    </div>
  );
};

export default SignIn;
