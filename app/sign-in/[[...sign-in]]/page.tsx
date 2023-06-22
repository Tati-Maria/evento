import ClientOnly from "@/components/sections/client-only";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen lg:flex-row lg:space-x-10">
      <div className="hidden lg:block">
        <Image
          alt="Sign In"
          src="/images/calendar.svg"
          width={400}
          height={400}
        />
      </div>
      <ClientOnly>
        <SignIn redirectUrl={"/"} />
      </ClientOnly>
    </div>
  );
}
