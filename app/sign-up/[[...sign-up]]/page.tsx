import ClientOnly from "@/components/sections/client-only";
import { SignUp } from "@clerk/nextjs";


export const metadata = {
  title: "Sign Up",
  description: "Sign up for an account.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ClientOnly>
        <SignUp />
      </ClientOnly>
    </div>
  );
}
