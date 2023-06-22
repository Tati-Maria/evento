import ClientOnly from "@/components/sections/client-only";
import { SignIn } from "@clerk/nextjs";


export const metadata = {
  title: "Sign In",
  description: "Sign in to your account.",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ClientOnly>
        <SignIn redirectUrl={"/"} />
      </ClientOnly>
    </div>
  );
}
