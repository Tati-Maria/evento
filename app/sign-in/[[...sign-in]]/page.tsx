import { SignIn } from "@clerk/nextjs";

export const metadata = {
    title: "Sign In",
    description: "Sign in to your account.",
}

export default function SignInPage() {
    return (
    <div
    className="flex flex-col justify-center items-center h-screen"
    >
        <SignIn 
        redirectUrl={"/"}
        />
    </div>
    );
}