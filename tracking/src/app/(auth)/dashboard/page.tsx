'use client'
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Not authenticated</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.username}</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
