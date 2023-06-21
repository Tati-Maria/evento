"use client";
import Link from "next/link";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  IoAnalyticsOutline,
  IoCalendarOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import MenuItem from "../ui/menu-item";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="drawer border-b z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-2xl">
            <Link href="/">Evento</Link>
          </div>
          <div className="flex-none  lg:hidden">
            <UserButton />
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal space-x-10">
              {/* Navbar menu content here */}
              <MenuItem
                className="hover:bg-gray-100 rounded-md h-12"
                title="Dashboard"
                href="/dashboard"
              />
              <MenuItem className="hover:bg-gray-100 rounded-md h-12" title="Events" href="/events" />
              <MenuItem className="hover:bg-gray-100 rounded-md h-12" title="Analytics" href="/analytics" />
              <div>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </div>
            </ul>
          </div>
        </div>
        {/* End Navbar */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-white pt-10">
          {/* Sidebar content here */}
          <MenuItem
            title="Dashboard"
            href="/dashboard"
            icon={LuLayoutDashboard}
            className="hover:bg-gray-100 rounded-md h-12"
          />
          <MenuItem
            className="hover:bg-gray-100 rounded-md h-12"
            title="Events"
            href="/events"
            icon={IoCalendarOutline}
          />
          <MenuItem
            title="Analytics"
            href="/analytics"
            icon={IoAnalyticsOutline}
            className="hover:bg-gray-100 rounded-md h-12"
          />
          <div className="hover:bg-gray-100 rounded-md h-12 p-4">
            <div className="flex items-center space-x-4">
              <SignedIn>
                <span>
                  <AiOutlineLogout className="w-6 h-6" />
                </span>
                <SignOutButton />
              </SignedIn>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <span>
                  <AiOutlineLogin className="w-6 h-6" />
                </span>
                <SignInButton />
              </SignedOut>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
