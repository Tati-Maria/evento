"use client";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { FaTimes } from "react-icons/fa";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { LuCalendarDays, LuLayoutDashboard } from "react-icons/lu";
import {
  IoAnalyticsOutline,
  IoCalendarOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import MenuItem from "../ui/menu-item";
import { FcVip } from "react-icons/fc";
import { Button } from "../ui/button";

const Navbar = () => {
  const user = useUser();

  return (
    <nav className="flex flex-col items-center justify-between w-full h-full p-4 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center justify-center w-full relative border-b">
        <Link
        className="flex items-center justify-center w-full h-14 text-2xl font-bold text-gray-700" 
        href="/">
          <FcVip className="w-6 h-6 mr-2" />
          Evento
        </Link>
      </div>
      <ul className="flex flex-col items-center justify-center w-full">
        <MenuItem title="Dashboard" icon={LuLayoutDashboard} href="/dashboard" />
        <MenuItem title="Events" icon={LuCalendarDays} href="/events" />
        <MenuItem title="Calendar" icon={IoCalendarOutline} href="/calendar" />
        <MenuItem title="Analytics" icon={IoAnalyticsOutline} href="/analytics" />
        <MenuItem title="Settings" icon={IoSettingsOutline} href="/settings" />
      </ul>
      <div
      className="border-t w-full pt-2 px-2 flex items-center justify-between" 
      >
        {user ? (
          <UserButton
          afterSignOutUrl="/" 
          />
        ) : (
          <SignInButton />
        )}
        {/* Toggle Theme */}
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
