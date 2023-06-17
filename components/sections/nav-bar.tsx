"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser,SignIn, SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";

const Navbar = () => {
  const user = useUser();

  useEffect(() => {
    <SignIn path="/sign-in" />;
  }, []);

  return (
    <nav className="flex items-center justify-between py-4 border-b">
      <Link href="/">
        <Image src="/mood.svg" alt="Mood Logo" width={40} height={50} />
      </Link>
      <ul className="flex space-x-10">
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
        {!!user ? (
          <div className="flex items-center gap-6">
            <Link href="/dashboard">Dashboard</Link>
          </div>
        ) : (
          <>
            <SignIn path="/sign-in" />
          </>
        )}
    </nav>
  );
};

export default Navbar;
