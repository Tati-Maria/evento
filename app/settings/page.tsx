import React from "react";
import { FiSettings } from "react-icons/fi";
import { UserProfile, UserButton, auth } from "@clerk/nextjs";
import ClientOnly from "@/components/sections/client-only";
import { getUser } from "@/actions/getUser";
import { getEvents } from "@/actions/getEvents";
import { getUserEvents } from "@/actions/getUserEvents";


const Settings = async () => {
    const {userId} = auth();
    const userEvents = await getUserEvents(userId ?? "");
   
  return (
    <section
      aria-label="Settings Page"
      className="p-4 border w-full max-w-6xl mx-auto h-screen shadow my-10 flex"
    >
      {/* <UserProfile /> */}
      <div
        className="flex flex-col w-1/4 border-r"
      >
        <div className="flex items-center justify-evenly p-4">
            <h1 className="text-2xl font-bold">Settings</h1>
        <ClientOnly>
          <div className="flex items-center space-x-4">
            <UserButton />
          </div>
        </ClientOnly>
        </div>
      </div>
      {/* List Of Events attended */}
      {/* List of events created */}
      {userEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center w-3/4">
            <h1 className="text-2xl font-bold">You haven&#39;t created any events yet.</h1>
        </div>
      )}
    </section>
  );
};

export default Settings;
