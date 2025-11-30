"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-lamaSkyLight to-lamaPurpleLight">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:flex flex-1 bg-[#00c3ff] relative items-center justify-center">
          <Image
            src="/login.jpg"
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-cover h-full"
          />
          <h1 className="absolute bottom-10 text-white text-3xl font-bold">Welcome Back!</h1>
        </div>

        {/* Right Side - SignIn Form */}
        <div className="flex-1 bg-white p-12 flex flex-col justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={48} height={48} />
            <h1 className="text-2xl font-bold text-gray-800">MySchool</h1>
            <p className="text-gray-500 text-sm">Sign in to your account</p>
          </div>

          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="flex flex-col gap-4 w-full"
            >
              <Clerk.GlobalError className="text-sm text-red-500" />

              <Clerk.Field name="identifier" className="flex flex-col gap-1">
                <Clerk.Label className="text-xs text-gray-500">Username</Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-lamaSky outline-none transition"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="password" className="flex flex-col gap-1">
                <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
                <Clerk.Input
                  type="password"
                  required
                  className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-lamaSky outline-none transition"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              <SignIn.Action
                submit
                className="bg-[#006aff] text-white py-3 rounded-md font-semibold hover:bg-lamaSkyDark transition"
              >
                Sign In
              </SignIn.Action>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
