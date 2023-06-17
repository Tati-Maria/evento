"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const user = useUser();

  return (
    <nav className="flex items-center justify-between py-4 border-b">
      <Link href="/">
        <Image src="/mood.svg" alt="Mood Logo" width={50} height={100} />
      </Link>
      <ul className="flex space-x-10">
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <div>
        {user.isSignedIn ? (
          <div className="flex items-center gap-6">
            <Link href="/dashboard">Dashboard</Link>
            <UserButton 
            afterSignOutUrl="/"
            />
          </div>
        ) : (
          <>
            <SignInButton />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
