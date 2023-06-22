import ClientOnly from "@/components/sections/client-only";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for an account.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen lg:flex-row lg:space-x-10">
      <div
      className="hidden lg:block"
      >
        <Image
          alt="Sign Up"
          src="/images/sign-up.svg"
          width={400}
          height={400}
        />
      </div>
      <ClientOnly>
        <SignUp />
      </ClientOnly>
    </div>
  );
}
