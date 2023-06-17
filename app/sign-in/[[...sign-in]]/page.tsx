import { SignIn } from "@clerk/nextjs";

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