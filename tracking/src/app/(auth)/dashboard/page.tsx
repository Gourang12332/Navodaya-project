"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {
 

  const { data: session } = useSession();

  if (!session) {
    return (
    <>
    <p>Not authenticated</p>
    <button className="signin" onClick={() =>{
      window.location.href = "/sign-in"
    }}>
      Sign in
    </button>
    </> )
  }

  return(
    <div>
      <p>Welcome {session.user.username}</p>
      <button
        onClick={() => signOut()}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}
